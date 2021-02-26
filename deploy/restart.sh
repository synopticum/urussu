# Stop all running containers
docker stop $(docker ps -a -q)

# Pull container updates
docker pull synopticum/user-experience-client
docker pull synopticum/user-experience-ssr
docker pull synopticum/user-experience-nginx

# Start up containers
docker-compose -f /usr/apps/user-experience/docker-compose.yml up -d

# Clean up
docker system prune -a -f