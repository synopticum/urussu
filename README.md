## Urussu

Urussu is website for a small town in Tatarstan, Russia built with love on top of modern UI technologies.

### Development usage

- Start `./client` and `./api` in development mode, find details in corresponding README files

### Production usage

CI/CD process is already configured for this repo, so just push your changes to trigger redeploy, and watch for the corresponding github action.

If you need to deploy the website manually for some reason, use next instructions:

#### Start
- Clone this repo to your SSH host manually
- Make sure there are all the necessary .env files for services
- Run `docker-compose up -d --build`

#### Stop

- `bash ./deploy/prod/stop.sh`

### Deployment scheme

- **nginx** - reverse proxy. Accessible on 80/443, TLS by default.
    - **client** - front-end static served by nginx
    - **api** - back-end server providing API
        - **mongo** - database server
    - **ssr** - server-side rendering server. Configured to only respond to search engine crawlers, not real users.
