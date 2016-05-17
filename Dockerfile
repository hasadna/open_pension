FROM python:3.5
MAINTAINER Nir Galon <nirgn975@gmail.com>
ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

# Install Node.js for npm modules.
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs

# Add a bash script to run Installation.
ADD run.sh /usr/run.sh
RUN chmod +x /usr/run.sh

VOLUME ["/usr/src"]
ENTRYPOINT ["/usr/run.sh"]

EXPOSE 80 3000
