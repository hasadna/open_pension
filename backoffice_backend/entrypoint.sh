#! /bin/bash

if [[ -n $DEBUG ]]
then
  echo "Running in local development mode"
  npm run dev
else
  echo "Running in production mode"
  npm install pm2 -g
  mpm run build
  pm2-runtime /home/app/build/main/index.js
fi
