## API Server

Node.js API server responsible for all back-end needs.

### Development usage

#### Start
- Start mongo (`mongod --dbpath ~/Desktop/git-home/urussu--db/`)
- Import DB dump (`mongorestore --drop --host localhost --gzip --archive=/Users/synoptic/Desktop/git-home/urussu/server/dump/urussu.latest.gz --nsInclude 'urussu.*'`)
- Create .env file based on `env.example`
- `npm start`

#### Dump DB
- `mongodump --archive=urussu.latest.gz --gzip --db urussu`

### Production usage

This service is dockerized and starts with the whole application.

Make sure that prod env file exists and passed to `./api` folder during deploy phase. See `./.github/workflows/ci.yml` for details. 
