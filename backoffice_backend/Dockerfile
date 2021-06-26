FROM node:14.16.1

WORKDIR /home/app
ADD . /home/app

RUN mkdir -p /home/app/files && \
    chmod 777 -R /home/app/files

# Intalling deps and build.
RUN npm i --also-dev && npm run build

# Run the entrypoint file.
RUN chmod +x /home/app/entrypoint.sh
CMD [ "/home/app/entrypoint.sh" ]
