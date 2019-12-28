# todo: create a docker image from here.
FROM php:7.4.1-apache

# Copy the directory.
COPY src/ /var/www/html/

# install the PHP extensions we need.
RUN set -eux;
RUN bash setup.sh

RUN apt update
RUN apt install git --yes

RUN apt install mariadb-server

# Copu the PHP ini.
COPY src/php.ini /usr/local/etc/php/

# todo: create a docker image to here.

# Installing composer realted stuff.
RUN mv composer.phar /usr/local/bin/composer
RUN composer self-update
RUN composer global require hirak/prestissimo
RUN composer install

# Copy the profiles.
COPY profiles /var/www/html/web/profiles

# Exposing the port.
EXPOSE 80

# Running the entry point.
COPY entrypoint.sh /var/www/html
RUN chmod +x /var/www/html/entrypoint.sh
#ENTRYPOINT [ "/var/www/html/entrypoint.sh" ]
