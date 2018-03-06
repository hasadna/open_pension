# Open Pension

[![license][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][dependency-image]][dependency-url] [![codecov][codecov-image]][codecov-url] [![Contributors][contributors-image]][contributors-url] [![Gitter][gitter-image]][gitter-url]

> The repo contains the server & the client parts of the Open Pension project.
Open Pension is [a "Hasadna" project](http://www.hasadna.org.il/), that aimed to revealing the secrets behind the Israeli pension market.

## Our Stack

  * [Angular](https://angular.io/)
  * [Django](https://www.djangoproject.com/)
  * [PostgreSQL](http://www.postgresql.org/)
  * [Docker](https://www.docker.com/)

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

  1. `cd server/config` then `cp local_settings.template local_settings.py` and modify it by your local postgres (database) settings.
  2. Install requirements with `pipenv install --dev` (located under `server` directory, you must have [pipenv](https://github.com/pypa/pipenv) installed).
  3. Migrate the data with `python3 manage.py migrate`.
  4. Create a superuser `python3 manage.py createsuperuser` and follow the instructions.
  5. Run the server with `python3 manage.py runserver`.
  6. Open the browser at [http://localhost:8000](http://localhost:8000).

## Tests

**Client**

  * Run `npm run lint` to check for lint mistakes.
  * Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
  * Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

**Server**

  * Run `pycodestyle --show-source --max-line-length=120 --exclude=pension/migrations --show-pep8 .` to check for lint mistakes.
  * Run `isort . --recursive --check-only` to check for import mistakes.
  * Run `python manage.py test` to run the unit tetst.

## Translation

**Client**

Not yet..

**Server**

To make new strings for translation use the command

```
python manage.py makemessages -l he
python manage.py compilemessages -l he
```

## Data

If you need the data itself use the `--recursive` flag when you `git clone` this repo.

### Old Database

To import the old database, first go to `server/data` directory, and open the `pension_data_all.csv.gz` file. Then run `python3 manage.py import_old_db` which search for `pension_data_all.csv` file in the `server/data` directory and import the csv file to our current database.

### Dummy Blog Posts

To create dummy blog posts just run `python3 manage.py create_blog_dummy_data`.

## Logging

Logging is done using [sentry.io](https://sentry.io/hasadna).

To see the log ask the team leader an access to the openPension email account.

## Deployment

Not yet..

## Contribute

Just fork and do a pull request (;

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/hasadna/open_pension/blob/master/LICENSE
[travis-image]: https://travis-ci.org/hasadna/open_pension.svg?branch=master
[travis-url]: https://travis-ci.org/hasadna/open_pension
[dependency-image]: https://dependencyci.com/github/hasadna/open_pension/badge
[dependency-url]: https://dependencyci.com/github/hasadna/open_pension
[codecov-image]: https://codecov.io/gh/hasadna/open_pension/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/hasadna/open_pension
[gitter-image]: https://img.shields.io/badge/Gitter-Join_the_chat_%E2%86%92-00d06f.svg
[gitter-url]: https://gitter.im/open-pension/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[contributors-image]: https://img.shields.io/github/contributors/hasadna/open_pension.svg
[contributors-url]: https://github.com/hasadna/open_pension/graphs/contributors
