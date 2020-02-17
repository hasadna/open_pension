FROM node:12.14.1-alpine3.11 as builder
WORKDIR /home/app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY ./src ./src
COPY ./public ./public
RUN npm run build

FROM nginx:alpine
LABEL maintainer="http://www.hasadna.org.il/"
COPY --from=builder /home/app/build /usr/share/nginx/html/
COPY nginx/ /etc/nginx/
