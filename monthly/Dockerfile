FROM node:12.20.0

LABEL maintainer="http://www.hasadna.org.il/"

RUN apt-get update && apt-get install -y netcat

ENV APP_DIR /home/app

WORKDIR $APP_DIR

COPY package*.json ./
RUN npm i

COPY . $APP_DIR

RUN cp .docker.env .env

# Running the entry point.
RUN chmod +x /home/app/entrypoint.sh
CMD [ "/home/app/entrypoint.sh" ]
