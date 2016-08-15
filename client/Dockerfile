# DO NOT USE IN PRODUCTION!

FROM node:6.3
MAINTAINER Nir Galon <nirgn975@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm set progress=false \
&& npm install -g angular-cli typings

COPY package.json /usr/src/app/
RUN npm install \
&& npm run postinstall

COPY . /usr/src/app
CMD ["npm", "start"]
