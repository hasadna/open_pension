#FROM node:12.14.1-alpine3.11
#
#LABEL maintainer="http://www.hasadna.org.il/"
#
#ENV APP_DIR /home/app/gateway
#
#WORKDIR $APP_DIR
#
#COPY package*.json ./
#RUN npm i
#
#COPY . $APP_DIR
#RUN npm run build
#
#CMD ["npm", "start"]

FROM jwilder/nginx-proxy
RUN { \
      echo 'server_tokens off;'; \
      echo 'client_max_body_size 100m;'; \
    } > /etc/nginx/conf.d/my_proxy.conf
