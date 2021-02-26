## About

This application fetches some data from server and draws draggable rectangles in special area. Position of the rectangles is based on fetched data.

- Frontend core is based on [React](https://reactjs.org/), [Redux](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/), and [Typescript](https://www.typescriptlang.org/)
- Draggable renderer is powered by [GSAP](https://greensock.com/draggable/)
- A tiny API server, providing ability to fetch data remotely and save updated rectangle position once dragging is finished (in memory) powered by [Express](https://expressjs.com/)

## How to start

First, create `.env` file in repository root folder with the content below:
```
NODE_TLS_REJECT_UNAUTHORIZED=0
NODE_ENV=development

API_URL=http://localhost:3000
```

Run next commands:
- `npm install` or `yarn`
- `npm run dev:server` or `yarn dev:server` to start API server
- `npm run dev:web` or `yarn dev:web` to start webpack development server on http://localhost:9000

Enjoy
