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

npm run clientGenerate
npm run migrate

npm run dev
