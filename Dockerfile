FROM python:latest

MAINTAINER Nir Galon <nirgn975@gmail.com>
ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

# Install Node.js for npm modules.
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

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

# Add a bash script to run all ..
RUN chmod +x /usr/src/run.sh
