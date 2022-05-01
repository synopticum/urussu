docker stop $(docker ps -q --filter ancestor=urussu_nginx)
docker stop $(docker ps -q --filter ancestor=urussu_api)
docker stop $(docker ps -q --filter ancestor=urussu_ssr)
docker stop $(docker ps -q --filter ancestor=urussu_client)
docker stop $(docker ps -q --filter ancestor=mongo)

docker system prune -a -f
