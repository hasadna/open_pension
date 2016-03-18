#FROM ubuntu:14.04
FROM python:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

# Install Node.js for npm modules.
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

#RUN apt-get install -y \
    #build-essential \
    #libpq-dev \
    #python3-pip \
    #python3-dev
    #libjpeg-dev \
    #zlib1g-dev


# Add project files.
ADD . /usr/src/
WORKDIR /usr/src

# Install django dependencies.
RUN cd /usr/src/server && \
    pip3 install -r requirements.txt

# Install Node.js dependencies.
RUN cd /usr/src/client && \
    npm install

RUN npm install -g gulp
