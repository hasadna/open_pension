#! /bin/bash

npm i

if [[ -n $DEBUG ]]
then
  echo "Running in local development mode"
  npm run dev
else
  echo "Running in production mode"
  npm run build
  npm run start
fi
