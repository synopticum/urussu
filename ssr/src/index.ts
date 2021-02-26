import express from 'express';
import morgan from 'morgan';
import SSR from './middlewares/ssr';

const PORT = 3000;
const app = express();

app.use(morgan('combined'));
app.get('*', SSR);

app.listen(PORT, () => {
  console.log(`Puppeteer SSR server URL: http://localhost:${PORT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log('Server started. Press Ctrl+C to quit');
});

export default app;
