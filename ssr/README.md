## Server-side rendering server

Simple SSR server based on [puppeteer](https://developers.google.com/web/tools/puppeteer), and made according to [Google recommendations](https://developers.google.com/web/tools/puppeteer/articles/ssr).
Supposed to be used for search engine crawlers only.

### Development usage

- Create .env file based on `env.example`
- `npm run dev`

### Production usage

This service is dockerized and starts with the whole application.

Make sure that prod env file exists and passed to `./ssr` folder during deploy phase. See `./.github/workflows/ci.yml` for details.
