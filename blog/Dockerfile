FROM node:12.14.1-alpine3.11

LABEL maintainer="http://www.hasadna.org.il/"

ENV APP_DIR /home/app

WORKDIR $APP_DIR

RUN npm install -g gatsby-cli

COPY package*.json ./
RUN npm i

COPY . $APP_DIR

# Exposing the port.
EXPOSE 8000

RUN chmod +x /home/app/entrypoint.sh
CMD ["/home/app/entrypoint.sh"]
