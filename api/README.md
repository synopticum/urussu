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

Database is placed on host machine filesystem, and passed to container via docker volumes. For the first run (when the db is empty) you need to import a dump manually:
- `mongorestore --drop --uri 'mongodb://login:password@0.0.0.0:27017/urussu' --archive=urussu.march.2021.gz --gzip --nsInclude 'urussu.*'`

Also remember that db login and password will be set from `./mongo/.env` only on the first run, so changes of this file won't be applied for the next runs.

Don't forget to dump database regularly:
- `mongodump --uri 'mongodb://login:password@0.0.0.0:27017/urussu?authSource=admin' --archive=urussu.april.2021.gz --gzip`
