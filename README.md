# Open Pension

[![license][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][dependency-image]][dependency-url] [![Gitter][gitter-image]][gitter-url]

> The repo contains the server & the client parts of the Open Pension project.
Open Pension is [a "Hasadna" project](http://www.hasadna.org.il/), that aimed to revealing the secrets behind the Israeli pension market.

## Our Stack

  * [Angular](https://angular.io/)
  * [Django](https://www.djangoproject.com/)
  * [PostgreSQL](http://www.postgresql.org/)

**Tools we use**

  * [Angular Cli](https://github.com/angular/angular-cli)
  * [Angular Material](https://material.angular.io/)
  * [ngrx](https://github.com/ngrx)

## Pre Requirements

  1. Make sure you have [Python 3.x](https://www.python.org/) and [pip](https://pypi.python.org/pypi/pip) installed.
  2. [NodeJS](nodejs.org)
  3. [Angular CLI](https://github.com/angular/angular-cli)
  4. [PostgreSQL](http://www.postgresql.org/)

## Installation

**Client**

  1. Install requirements with `npm install` (located under `client` directory).
  2. Run the server with `npm start`.
  3. Open the browser at [http://localhost:4200](http://localhost:4200).

**Server**

  1. `cd server/config` then `cp local_settings.template local_settings.py` and modify it by your local settings.
  2. Install requirements with `pip install -r requirements.txt` (located under `server` directory).
  3. Migrate the data with `python manage.py migrate`.
  4. Import the dummy data with `python manage.py import_data`.
  5. Run the server with `python manage.py runserver`.
  6. Open the browser at [http://localhost:8000](http://localhost:8000).

## Tests

**Client**

  * Run `npm run lint` to check for lint mistakes.
  * Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
  * Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

**Server**

  * Not yet.

## Translation

**Client**

Not yet..

**Server**

To make new strings for translation use the command

```shell
python manage.py makemessages -l he
python manage.py compilemessages -l he
```

## Data

If you need the data itself use the `--recursive` flag when you `git clone` this repo.

## Deploy

**Client**

  1. Run `ng build -prod -aot` to build the project.
  2. Run `npm run sw` to generate the service worker file (in `dist` directory).

**Server**

  1. Not yet..

## Contribute

Just fork and do a pull request (;

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/hasadna/open_pension/blob/master/LICENSE
[travis-image]: https://travis-ci.org/hasadna/open_pension.svg?branch=master
[travis-url]: https://travis-ci.org/hasadna/open_pension
[dependency-image]: https://dependencyci.com/github/hasadna/open_pension/badge
[dependency-url]: https://dependencyci.com/github/hasadna/open_pension
[gitter-image]: https://img.shields.io/badge/Gitter-Join_the_chat_%E2%86%92-00d06f.svg
[gitter-url]: https://gitter.im/open-pension/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
