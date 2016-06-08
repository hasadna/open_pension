FROM node:latest
MAINTAINER Nir Galon <nirgn975@gmail.com>

RUN apt-get -y update

RUN npm install -g angular-cli

RUN cd /usr/src/app && npm install

RUN cd /usr/src/app && ng build
