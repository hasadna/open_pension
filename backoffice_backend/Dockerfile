FROM node:14.16.0

WORKDIR /app
ADD . /app

RUN npm i --also-dev && npm install pm2 -g && npm run build

CMD ["pm2-runtime", "build/main/index.js"]
