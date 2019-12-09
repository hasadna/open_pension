#!/usr/bin bash

# Check if DB exists.
echo "Waiting for DB connection"
#while ! echo exit | nc $MYSQL_HOST $MYSQL_PORT;
#do
#    echo "DB still off-line....";
#    sleep 10;
#done
#
## Install drupal if not already installed
#drupal/vendor/bin/drupal site:install open_pension mysql://user:password@cms_db/db \
#  --langcode="en" \
#  --site-name="Drupal 8" \
#  --site-mail="admin@example.com" \
#  --account-name="admin" \
#  --account-mail="admin@example.com" \
#  --account-pass="admin" \
#  --no-interaction

## Install modules which cannot be installed as dependencies of the profile.
#drupal/vendor/bin/drush en open_pension_blog open_pension_files open_pension_logs
