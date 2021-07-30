import puppeteer from 'puppeteer';
import ssr from './ssr';
import type { Request, Response } from 'express';

const HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'client';
const PORT = 9000;
const BASE_URL = `http://${HOST}:${PORT}`;

let browserWSEndpoint: string = null;

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!browserWSEndpoint) {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
      });
      browserWSEndpoint = await browser.wsEndpoint();
    }

    const url = `${BASE_URL}${req.url}`;
    const { html, ttRenderMs } = await ssr(url, browserWSEndpoint);

    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);

    return res.status(200).send(html);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.end('Internal server error');
  }
};
