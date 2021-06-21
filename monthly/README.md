# Monthly

The monthly service handles only monthly data filed, which are based on XML. You need to have at least node version of 14.16.1.

## Stack

The stack is based on NodeJS + TypeScript, GraphQL and Prisma.io.

## Install

As always:

```bash
npm i
```

Open the `.env` file and make sure the `DATABASE_URL` (make sure you have a MySQL server running in the background). Other settings are not required for local development.

*Production settings will be explained later on (TBD).*

Next, run:
```bash
npm run prisma:migrate
npm run prisma:seed
npm run dummySeed
```

This will create the DB, seed the reclamation data and seed dummy data for you.

## Change the structure of the DB
If you want to add new models, are change existing models you need to go to `prisma/schema.prisma`, change the structure according to [Prisma](https://www.prisma.io/) docs.
Then run:
```bash
npm run prisma:makeMigration
npm run prisma:clientGenerate
npm run prisma:format
```

The interactive shell will ask two question of you defined the structure properly and will apply the migrations.

In order to run it manually, like other computer, you need to run:
```bash
npm run prisma:migrate
```

For explore the data in the DB you can run:
```bash
npm run prisma:studio
```
