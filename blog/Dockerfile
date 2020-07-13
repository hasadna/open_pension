FROM node:12

# set working directory
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies using yarn
ADD package.json package-lock.json /app/
RUN npm i

# Copy all frontend stuff to new "app" folder
COPY . /app/
RUN ls -al /app/
RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]

EXPOSE 8000
