# Production image, copy all the files and run next
FROM node:14.17.1

ENV NODE_ENV production

WORKDIR /home/app
COPY . ./

# todo: get the username fo the user.
#USER nodejs

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

# Running the entry point.
RUN chmod +x /home/app/entrypoint.sh
CMD [ "bash", "/home/app/entrypoint.sh" ]
