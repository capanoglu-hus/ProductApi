FROM node:18.13.0 AS storeapp

WORKDIR /storeapp

COPY storeapp/package.json .

COPY storeapp/package-lock.json .

RUN npm install
COPY . .

CMD ["npm","start"]