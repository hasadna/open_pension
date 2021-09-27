#! /bin/bash

if [[ -n $DEBUG ]]
then
  echo "Running in local development mode"
  npm run start
else
  echo "Running in production mode"
  npm run build
  npm run serve -s build -l 80
fi
