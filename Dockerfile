FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/client/sandberg-movie
RUN npm install
RUN npm rebuild node-sass --force
RUN npm install -g nodemon
WORKDIR /usr/src/app
EXPOSE 3000 8080
CMD ["nodemon", "--ignore", "client/"]
