FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

EXPOSE 3000

CMD [ "node", "app" ]