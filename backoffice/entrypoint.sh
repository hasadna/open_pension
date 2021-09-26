#! /bin/bash

if [[ -n $DEBUG ]]
then
  echo "Running in local development mode"
  npm run start
else
  echo "Running in production mode"
  npm run build
  # todo: move to npm script
  npm install -g serve
  serve -s build -l 80
fi
