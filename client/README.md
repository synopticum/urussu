## Client

Client is the application front-end, based on [React](https://github.com/facebook/react), [Typescript](https://www.typescriptlang.org/) and [Leaflet.js](https://leafletjs.com/).

### Development usage

- Create .env file based on `env.example`
- `npm run dev`

### Production usage

This service is dockerized and starts with the whole application.

Make sure that prod env file exists and passed to `./client` folder during deploy phase. See `./.github/workflows/ci.yml` for details.
