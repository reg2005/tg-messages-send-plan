FROM node:14-alpine
WORKDIR /app
RUN apk add --no-cache git curl bash

RUN apk add docker docker-compose

COPY package*.json ./
RUN npm ci
COPY . /app
RUN mkdir -p /app/tmp

RUN npm run build

