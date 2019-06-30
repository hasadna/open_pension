FROM drupal:8.7.3-apache

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install git-core --assume-yes

# Install composer.
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php --install-dir=/bin --filename=composer
RUN php -r "unlink('composer-setup.php');"

ADD . ./drupal

RUN cd drupal
RUN composer install
RUN composer require drupal/console

# Install drupal
RUN ls -al ./vendor/bin
RUN ./vendor/bin/drupal site:install open_pension mysql://user:password@cms_db/db \
  --langcode="en"  \
  --site-name="Drupal 8"  \
  --site-mail="admin@example.com"  \
  --account-name="admin"  \
  --account-mail="admin@example.com"  \
  --account-pass="admin" \
  --no-interaction
