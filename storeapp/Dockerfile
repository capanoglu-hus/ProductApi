FROM node:18.13.0 AS base
WORKDIR /app
EXPOSE 3000

FROM node:18.13.0 AS install
WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .


CMD ["npm" , "start"]
