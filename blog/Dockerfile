FROM node:12

# set working directory
RUN mkdir /app
WORKDIR /app

# Setting up stuff for deployment.
RUN apt-get update && apt-get install lsof
RUN git config --global user.email "author@hasadna.org.il"
RUN git config --global user.name "Open Pension"

# install and cache app dependencies using yarn
ADD package.json package-lock.json /app/
RUN npm i

# Copy all frontend stuff to new "app" folder
COPY . /app/
RUN ls -al /app/
RUN chmod +x /app/entrypoint.sh
RUN chmod +x /app/deploy.sh
CMD ["/app/entrypoint.sh"]

EXPOSE 8000
