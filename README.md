# Open Pension
The repo contains the server & the client parts of the Open Pension project.
Open Pension is [a "Hasadna" project](hasadna.org.il), that aimed to revealing the secrets behind the Israeli pension market.

## Pre Requirements
1. install [docker](https://www.docker.com/).
2. install [docker-machine](https://docs.docker.com/machine/) only if you're on Windows / OSX.

## Installation
Install the project for development.

1. `cd server/config` then `cp local_settings.template local_settings.py` and modify it by your local settings.
2. Build the docker image with `$ docker build -t op .` (when you in the root of the project).
3. Run `$ docker run -dit -v `pwd`:/usr/src -p 8080:80 --name=op-con op` to run a docker container based on the docker image we build in step two.
4. Start coding! (:

If you wan't to enter the bash inside the machine `$ docker exec -it op-con bash`.

## Our Stack
* [Angular 2.x](https://angularjs.org/)
* [Django 1.9.x](https://www.djangoproject.com/)
* [PostgreSQL](http://www.postgresql.org/)

## Contribute
Just fork and do a pull request (;

## License
MIT
