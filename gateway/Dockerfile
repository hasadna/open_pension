FROM node:11

LABEL maintainer="http://www.hasadna.org.il/"

ENV APP_NAME "gateway"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

WORKDIR $APP_DIR

COPY package.json ./
COPY .env.docker.example ./.env


COPY . $APP_DIR

EXPOSE 3000
CMD ["npm", "install"]
CMD ["npm", "i", "-g", "tslint typescript ts-node"]
CMD ["npm", "i", "-D", "jest typescript ts-jest @types/jest"]
CMD ["npm","run","dev"]
