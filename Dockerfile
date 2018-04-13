FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm install -g forever
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["forever", "start", "./bin/www"]
