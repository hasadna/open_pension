#!/usr/bin/env bash


# Install composer.
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php --install-dir=/bin --filename=composer
php -r "unlink('composer-setup.php');"

# Install git for composer packages.
apt-get update
apt-get install git-core --assume-yes

# Go Drupal directory and install the dependacies.
cd drupal

composer install

# Install drupal
./vendor/bin/drupal site:install open_pension mysql://user:password@cms_db/db \
  --langcode="en"  \
  --site-name="Drupal 8"  \
  --site-mail="admin@example.com"  \
  --account-name="admin"  \
  --account-mail="admin@example.com"  \
  --account-pass="admin" \
  --no-interaction
#./vendor/bin/drush si open_pension --db-url=mysql://user:password@cms_db/db --account-name=admin --account-pass=admin -y
./vendor/bin/drush en open_pension_blog open_pension_files
echo "Completed\n"
