FROM node:12-alpine as build-stage

ADD . /app
WORKDIR /app

ARG REACT_APP_API

ENV REACT_APP_API $REACT_APP_API

RUN echo $REACT_APP_API

# installing the pakcages and build the front.
RUN npm i --also-dev && npm run build


CMD ["npm", "start"]

## The second stage is to move to an nginx container so we could serve the react
## app.
#FROM nginx:1.15.2-alpine
#
## Copy the compiled react app to the /var/www, which is the default directory of
## nginx. This would help us, without any furthure issues to serve the react app.
#COPY --from=build-stage /app/build /var/www
#COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf
#
## Exposing port 80 and firing up the nginx.
#EXPOSE 80
#ENTRYPOINT ["nginx","-g","daemon off;"]
