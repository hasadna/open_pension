# Open Pension

[![license][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Python 3][python-image]][python-url] [![Updates][updates-image]][updates-url] [![Join the chat at https://gitter.im/open-pension/Lobby][gitter-image]][gitter-url]

> The repo contains the server & the client parts of the Open Pension project.
Open Pension is [a "Hasadna" project](http://www.hasadna.org.il/), that aimed to revealing the secrets behind the Israeli pension market.

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

## Contribute

Just fork and do a pull request (;

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/hasadna/open_pension/blob/master/LICENSE
[travis-image]: https://travis-ci.org/hasadna/open_pension.svg?branch=master
[travis-url]: https://travis-ci.org/hasadna/open_pension
[python-image]: https://pyup.io/repos/github/hasadna/open_pension/python-3-shield.svg
[python-url]: https://pyup.io/repos/github/hasadna/open_pension
[updates-image]: https://pyup.io/repos/github/hasadna/open_pension/shield.svg
[updates-url]: https://pyup.io/repos/github/hasadna/open_pension
[gitter-image]: https://badges.gitter.im/open-pension/Lobby.svg
[gitter-url]: https://gitter.im/open-pension/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
