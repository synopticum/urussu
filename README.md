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

- `bash ./deploy/stop.sh`

### CI/CD

#### Deployment scheme

- **nginx** - reverse proxy. Accessible on 80/443, TLS by default.
    - **client** - front-end static served by nginx
    - **api** - back-end server providing API
        - **mongo** - database server
    - **ssr** - server-side rendering server. Configured to only respond to search engine crawlers, not real users.

#### Usage with dedicated CI server and Docker Hub

Current deployment process doesn't involve anything but the only physical production server. But it's easy to enable dedicated CI server (like Travis CI) and container repository. 

There is `./deploy` folder with all the necessary scripts:

- `deploy.sh` builds the containers, push them to Docker Hub, and triggers `restart.sh`
- `restart.sh` pulls latest containers, starts them using `docker-compose.yml`, and makes clean-up
- `docker-compose.yml` - version of docker-compose for usage with Docker Hub  
- `stop.sh` stops the containers and makes clean-up
- `docker-compose.yml`


