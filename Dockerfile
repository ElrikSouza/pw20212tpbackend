FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY src ./src

COPY .sequelizerc ./.sequelizerc

RUN mkdir public

RUN npm install

EXPOSE 3020

CMD ["node", "src/server.js"]