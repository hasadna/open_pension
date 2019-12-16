FROM node:11

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

CMD ["npm", "start"]
