FROM node:alpine as builder
WORKDIR '/app'

COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_ENV=production
ENV DEFAULT_LANGUAGE=ru
ENV API_URL=https://www.u-r-u-s-s-u.com/api

RUN npm run build

FROM nginx
EXPOSE 9000
COPY configs/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/web /usr/share/nginx/html
