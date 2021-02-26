FROM buildkite/puppeteer:5.2.1
WORKDIR '/app'

COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start"]
