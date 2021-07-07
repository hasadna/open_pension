FROM node:14.17.3

ENV NODE_ENV production

WORKDIR /home/app
COPY . ./

# todo: get the username fo the user.
#USER nodejs

# Running the entry point.
RUN chmod +x /home/app/entrypoint.sh
CMD [ "bash", "/home/app/entrypoint.sh" ]
