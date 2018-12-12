FROM node:8

ENV APP_NAME "client"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

WORKDIR $APP_DIR

COPY . $APP_DIR

RUN npm install
RUN npm run build

FROM nginx:alpine
LABEL maintainer="http://www.hasadna.org.il/"
COPY --from=builder /home/app/dist /usr/share/nginx/html/
COPY nginx/ /etc/nginx/
