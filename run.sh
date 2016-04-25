#!/usr/bin/env bash

# Install django dependencies.
cd /usr/src/server && pip install -r requirements.txt

# Install Node.js dependencies.
cd /usr/src/client && npm install
npm install -g gulp

apt-get install -y nginx
#cd /usr/src/server
#python manage.py migrate
#python manage.py runserver

# temp
#cd /usr/src/client
#npm start

echo "run.sh is on! yeah! (:"
