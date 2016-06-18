#!/usr/bin/env bash

#Disable npm progress bar - for speed.
npm set progress=false

# Install Angular CLI tool.
npm install -g angular-cli

# Install npm dependencies.
npm install

# Start the npm server
ng serve
