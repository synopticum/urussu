import puppeteer from 'puppeteer';

// In-memory cache of rendered pages. Note: this will be cleared whenever the
// server process stops. If you need true persistence, use something like
// Google Cloud Storage (https://firebase.google.com/docs/storage/web/start).
const RENDER_CACHE = new Map();

type SSR = {
  html: string;
  ttRenderMs: number;
};

async function ssr(url: string, browserWSEndpoint: string): Promise<SSR> {
  if (RENDER_CACHE.has(url)) {
    return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
  }

  const start = Date.now();
  const browser = await puppeteer.connect({ browserWSEndpoint });
  const page = await browser.newPage();

  // Intercept network requests.
  await page.setRequestInterception(true);

  page.on('request', req => {
    // Ignore requests for resources that don't produce DOM
    // (images, stylesheets, media).
    const allowList = ['document', 'script', 'xhr', 'fetch'];

    if (!allowList.includes(req.resourceType())) {
      return req.abort();
    }

    // Don't load Google Analytics lib requests so pageviews aren't 2x.
    const blockList: string[] = ['www.google-analytics.com', '/gtag/js', 'ga.js', 'analytics.js'];

    if (blockList.find(regex => req.url().match(regex))) {
      return req.abort();
    }

    // Pass through all other requests.
    req.continue();
  });

  try {
    const renderUrl = new URL(url);

    renderUrl.searchParams.set('headless', '');
    await page.goto(renderUrl.toString(), { waitUntil: 'networkidle0' });
    await page.waitForSelector('#ssr');
  } catch (err) {
    console.error(err);
    throw new Error('page.goto/waitForSelector timed out.');
  }

  const html = await page.content();
  await page.close();

  const ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);

  RENDER_CACHE.set(url, html);

  return { html, ttRenderMs };
}

export { ssr as default };
