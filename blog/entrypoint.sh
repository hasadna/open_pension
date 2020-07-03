#!/bin/ash
gatsby clean

# Building and serving.
npm run build
npm run serve &

# Set up the development environment.
npm run develop
