FROM node:18.13.0 AS base
WORKDIR /app
EXPOSE 3000

FROM node:18.13.0 AS install
WORKDIR /src
COPY storeapp/package.json .
COPY storeapp/package-lock.json .
COPY storeapp/public/.. .
RUN npm install
COPY . .


CMD ["npm" , "start"]
