FROM node:14.16.1

WORKDIR /app
ADD . /app

RUN mkdir -p /app/files && chmod 777 -R /app/files
RUN npm i --also-dev && npm install pm2 -g && npm run build

CMD ["node", "build/main/index.js"]
