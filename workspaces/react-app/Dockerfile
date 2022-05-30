FROM node:16.15.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY . .

RUN yarn install
