#!/usr/bin/env bash

cd /usr/src/server
python3 manage.py migrate
python3 manage.py runserver

# temp
cd /usr/src/client
npm start
