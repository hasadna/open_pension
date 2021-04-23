FROM node:14.16.1

WORKDIR /app
ADD . /app

RUN mkdir -p /app/files && chmod 777 -R /app/files
RUN npm i --also-dev


#CMD ["npm", "run", "dev"]
#CMD ["node", "build/main/index.js"]
ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]
