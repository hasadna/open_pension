# todo: create a docker image from here.
FROM php:7.4.1-apache

WORKDIR /var/www/html

RUN apt update && apt install --yes --no-install-recommends \
    git \
    mariadb-server \
    libfreetype6-dev \
    libjpeg-dev \
    libpng-dev \
    libpq-dev \
    libzip-dev && \
    rm -rf /var/lib/apt/lists/*

# install the PHP extensions we need.
RUN set -eux && \
    savedAptMark="$(apt-mark showmanual)"  && \
    docker-php-ext-configure gd \
      --with-freetype-dir=/usr \
      --with-jpeg-dir=/usr \
      --with-png-dir=/usr  && \
    docker-php-ext-install -j "$(nproc)" \
            gd \
            opcache \
            pdo_mysql \
            pdo_pgsql \
            zip \

# Copy the PHP ini and set up apache.
COPY build-tools /tmp/build-tools
RUN mv /tmp/build-tools/php.ini /usr/local/etc/php/ && \
    a2enmod rewrite && \
    mv /tmp/build-tools/000-default.conf /etc/apache2/sites-available

# todo: create a docker image to here.

COPY composer/composer.* /composer

# Installing composer realted stuff.
RUN mv /tmp/build-tools/composer.phar /usr/local/bin/composer && \
    composer self-update && \
    composer global require hirak/prestissimo && \
    cd /composer && \
    composer install --working-dir=/var/www/html && \
    cd -

COPY src .

# Exposing the port.
EXPOSE 80

# Running the entry point.
RUN ls -al
RUN chmod +x /var/www/html/entrypoint.sh
CMD [ "/var/www/html/entrypoint.sh" ]


