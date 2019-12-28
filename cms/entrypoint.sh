#! /bin/bash

# Check if DB exists.
echo "Waiting for DB connection"
while ! echo exit | nc $MYSQL_HOST $MYSQL_PORT;
do
    echo "DB still off-line....";
    sleep 10;
done

# Install drupal if not already installed
vendor/bin/drush si open_pension --db-url=mysql://user:password@cms_db/db_new --account-pass="admin" --account-name="admin" -y -v
