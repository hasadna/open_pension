FROM node:16.18-bullseye-slim

ENV NODE_ENV production

WORKDIR /home/app
COPY . ./

# todo: get the username fo the user.
#USER nodejs

# Running the entry point.
RUN chmod +x /home/app/entrypoint.sh
CMD [ "bash", "/home/app/entrypoint.sh" ]
