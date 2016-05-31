#!/usr/bin/env bash

# Install npm dependencies.
cd /usr/src/app
npm install -g webpack webpack-dev-server typings typescript
npm install

# Start the npm server
npm start
