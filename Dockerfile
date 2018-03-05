FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
WORKDIR /usr/src/app/client/sandberg-movie
RUN rm -rf node_modules/node-sass
RUN npm install
RUN npm install -g nodemon
WORKDIR /usr/src/app
EXPOSE 3000 8080
CMD ["nodemon", "--ignore", "client/"]
