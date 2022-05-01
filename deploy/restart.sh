# Stop all running containers
docker stop $(docker ps -q --filter ancestor=urussu_nginx)
docker stop $(docker ps -q --filter ancestor=urussu_api)
docker stop $(docker ps -q --filter ancestor=urussu_ssr)
docker stop $(docker ps -q --filter ancestor=urussu_client)
docker stop $(docker ps -q --filter ancestor=mongo)

# Pull container updates
docker pull synopticum/urussu-client
docker pull synopticum/urussu-api
docker pull synopticum/urussu-ssr
docker pull synopticum/urussu-nginx

# Start up containers
docker-compose -f /Users/synoptic/Desktop/server/urussu/docker-compose.yml up -d

# Clean up
docker system prune -a -f
