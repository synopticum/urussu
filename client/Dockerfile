FROM node:alpine as builder
WORKDIR '/app'

COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

FROM nginx
EXPOSE 9000
COPY configs/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/web /usr/share/nginx/html
