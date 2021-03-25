# Stop script if any errors
set -e

IMAGE_CLIENT="synopticum/urussu-client"
IMAGE_SSR="synopticum/urussu-ssr"
IMAGE_NGINX="synopticum/urussu-nginx"
GIT_VERSION=$(git describe --always --abbrev --tags --long)

# Building images
docker build -t ${IMAGE_CLIENT}:latest ./client
docker tag ${IMAGE_CLIENT}:latest ${IMAGE_CLIENT}:${GIT_VERSION}

docker build -t ${IMAGE_SSR}:latest ./ssr
docker tag ${IMAGE_SSR}:latest ${IMAGE_SSR}:${GIT_VERSION}

docker build -t ${IMAGE_NGINX}:latest ./nginx
docker tag ${IMAGE_NGINX}:latest ${IMAGE_NGINX}:${GIT_VERSION}

# Docker login (env variables are set in travis-ci.com settings)
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

# Uploading to Docker Hub
docker push ${IMAGE_CLIENT}:latest
docker push ${IMAGE_NGINX}:latest
docker push ${IMAGE_SSR}:latest

# Redeploy on VDS
ssh synoptic@www.u-r-u-s-s-u.com 'bash -s' < ./deploy/restart.sh
