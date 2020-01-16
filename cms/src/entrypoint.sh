#! /bin/bash

# Check if DB exists.
echo "Waiting for DB connection"
while ! echo exit | nc -vz $MYSQL_HOST $MYSQL_PORT;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

# Install drupal if not already installed
# Create a drush commnand for checking if drupal installed or not - if so just run updb.

cd web
../vendor/bin/drush orchestrate --verbose
cd -

# Clear cache for css and js issues.
chmod 777 -R web/sites/default/files/
vendor/bin/drush cr

# Start the apache process.
exec apache2-foreground
