# BLOP - business logic operation for the open pension project

[![Build Status](https://travis-ci.org/RoySegall/bonappetit.svg?branch=master)](https://travis-ci.org/RoySegall/bonappetit)

## Setting up.

First, install all the packages.
```bash
npm install
```

Make sure you have a mongo DB up and running. 

Next, copy the example of the env file to your own env file:
```bash
cp .env.example .env
```

Now, edit the env file to match your settings. A good example is:
```dotenv
PORT=3000
```

After that:
```bash
npm run dev
```

## Settings

First, let's set up some dependencies for the tests:

```bash
npm i -g tslint typescript ts-node
npm i -D jest typescript ts-jest @types/jest
```

There are two type of tests:

* `npm run lint` - Will check the standards in the lint
* `npm run unit-test` - Will run unit test code base on jest
