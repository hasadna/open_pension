FROM node:14.21.2

WORKDIR /home/app
ADD . /home/app

ARG REACT_APP_API
ENV REACT_APP_API $REACT_APP_API

# installing the pakcages and build the front.
RUN npm i --also-dev

# Running the entry point.
RUN chmod +x /home/app/entrypoint.sh
CMD [ "bash", "/home/app/entrypoint.sh" ]
