FROM node:11

LABEL maintainer="http://www.hasadna.org.il/"

ENV APP_DIR /home/app/cms

WORKDIR $APP_DIR

RUN npm install -g strapi@alpha
COPY package*.json ./
RUN npm i

COPY . $APP_DIR

RUN chmod +x ./run.sh

CMD ["./run.sh"]
