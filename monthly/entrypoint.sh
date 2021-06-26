#! /bin/bash

# Check if DB exists.DB
echo "Waiting for DB connection"
# todo: move to deticated env
while ! echo exit | nc -vz monthly_db 3306;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

# Migrating the DB.
npm run build
npm run prisma:clientGenerate
npm run prisma:migrate
npm run prisma:seed

if [[ -n $DEBUG ]]
then
  echo "Running in local development mode"
  npm run worker &>> queue.txt &
  npm run dev
else
    echo "Running in production mode"
  supervisord -c /etc/supervisor.conf
fi
