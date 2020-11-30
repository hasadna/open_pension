#! /bin/bash

# Check if DB exists.
echo "Waiting for DB connection"
while ! echo exit | nc -vz $MYSQL_HOST $MYSQL_PORT;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

# Install drupal if not already installed.
cd web

if ../vendor/bin/drush orchestrate --verbose; then
    echo "The site already exists. Installation has been skipped"
else
  ../vendor/bin/drush si open_pension --db-url="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DATABASE}" --account-pass="${ACCOUNT_PASS}" --account-name="${ACCOUNT_NAME}" -y -v
  bash profiles/post_setup.sh
fi

../vendor/bin/drush sqlq "truncate table cache_graphql_definitions;"

# Clear cache for css and js issues.
chmod 777 -R sites/default/files/
../vendor/bin/drush cr

supervisord -c /etc/supervisor.conf
