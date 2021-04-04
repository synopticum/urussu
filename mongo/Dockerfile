FROM mongo

COPY ../../urussu.latest.gz ./dump/urussu.latest.gz

CMD mongorestore --drop --host localhost --gzip --archive=./dump/urussu.latest.gz --nsInclude 'urussu.*'
