FROM node:12-alpine as build-stage

ADD . /app
WORKDIR /app

ARG REACT_APP_API

ENV REACT_APP_API $REACT_APP_API

# installing the pakcages and build the front.
RUN npm i --also-dev && npm run build

# todo: use nginx to serve it properly.
CMD ["npm", "start"]
