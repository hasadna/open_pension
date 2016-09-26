# Open Pension

[![Build Status](https://travis-ci.org/hasadna/open_pension.svg?branch=master)](https://travis-ci.org/hasadna/open_pension)

The repo contains the server & the client parts of the Open Pension project.
Open Pension is [a "Hasadna" project](hasadna.org.il), that aimed to revealing the secrets behind the Israeli pension market.

## Our Stack

  * [Angular 2.0](https://angular.io/)
  * [Django 1.10.1](https://www.djangoproject.com/)
  * [PostgreSQL](http://www.postgresql.org/)

## Pre Requirements

  1. Make sure you have Python 3.x and pip installed.
  2. [NodeJS](nodejs.org).
  3. [Angular CLI](https://github.com/angular/angular-cli).

## Installation

**Client**

  1. `npm install` inside the `client` directory.
  2. Open the browser at [http://localhost:4200](http://localhost:4200).

**Server**

  1. `cd server/config` then `cp local_settings.template local_settings.py` and modify it by your local settings.
  2. Install requirements with `pip install -r requirements.txt` (located under `server` directory).
  3. Migrate the data with `python manage.py migrate`.
  4. Import the dummy data with `python manage.py import_data`.
  5. Run the server with `python manage.py runserver`.
  6. Open the browser at [http://localhost:8000](http://localhost:8000).

## Tests

**Client**

  * Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
  * Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

**Server**

  * Not yet.

## Contribute

Just fork and do a pull request (;

## License

MIT
