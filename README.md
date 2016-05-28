[![Build Status](https://travis-ci.org/hasadna/open_pension.svg?branch=master)](https://travis-ci.org/hasadna/open_pension)

# Open Pension
The repo contains the server & the client parts of the Open Pension project.
Open Pension is [a "Hasadna" project](hasadna.org.il), that aimed to revealing the secrets behind the Israeli pension market.

## Pre Requirements
1. install [docker](https://www.docker.com/).
2. install [docker-compose](https://docs.docker.com/compose/install/).

## Installation
Install the project for development.

1. `cd server/config` then `cp local_settings.template local_settings.py` and modify it by your local settings.
2. Run `$ docker-compose up` to build the docker images and run them.
3. That's it, no step two. Start coding! (:

## Our Stack
* [Angular 1.x](https://angularjs.org/)
* [Django 1.9.x](https://www.djangoproject.com/)
* [PostgreSQL](http://www.postgresql.org/)

## Contribute
Just fork and do a pull request (;

## License
MIT
