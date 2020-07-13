#FROM node:12.14.1
#
#LABEL maintainer="http://www.hasadna.org.il/"
#
#ENV APP_DIR /home/app
#
#WORKDIR $APP_DIR
#
#RUN npm install -g gatsby-cli
#
#COPY package*.json ./
#RUN npm i
#
#COPY . $APP_DIR
#
## Exposing the port.
#EXPOSE 8000
#
#RUN chmod +x /home/app/entrypoint.sh

# base image
FROM node:11

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies using yarn
ADD package.json package-lock.json /app/
RUN npm i

# Copy all frontend stuff to new "app" folder
COPY . /app/

EXPOSE 8000
#EXPOSE 9000

CMD ["./entrypoint.sh"]
