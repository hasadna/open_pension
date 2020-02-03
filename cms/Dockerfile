FROM php:7.4.1-apache

WORKDIR /var/www/html

RUN apt update && apt install --yes --no-install-recommends \
    git \
    mariadb-server \
    libfreetype6-dev \
    libjpeg-dev \
    libpng-dev \
    libpq-dev \
    netcat \
    libzip-dev && \
    rm -rf /var/lib/apt/lists/*

# install the PHP extensions we need.
RUN set -eux && \
    savedAptMark="$(apt-mark showmanual)"  && \
    docker-php-ext-configure gd \
      --with-freetype \
      --with-jpeg && \
    docker-php-ext-install -j "$(nproc)" \
            gd \
            opcache \
            pdo_mysql \
            pdo_pgsql \
            zip

# Copy the PHP ini and set up apache.
COPY build-tools /tmp/build-tools
RUN mv /tmp/build-tools/php.ini /usr/local/etc/php/ && \
    a2enmod rewrite && \
    mv /tmp/build-tools/000-default.conf /etc/apache2/sites-available

# Composer install
COPY src/composer.* ./
RUN mv /tmp/build-tools/composer.phar /usr/local/bin/composer && \
    composer self-update && \
    composer global require hirak/prestissimo && \
    composer install


COPY src .

# Exposing the port.
EXPOSE 80

# Running the entry point.
RUN chmod +x /var/www/html/entrypoint.sh
CMD [ "/var/www/html/entrypoint.sh" ]
