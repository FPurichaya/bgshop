FROM node:10.16.0-alpine

RUN mkdir -p /app/shop-api
WORKDIR /app/shop-api

COPY package.json .
RUN yarn install
COPY . ./

EXPOSE 80
CMD yarn start