#!/usr/bin/env bash

if command -v a2enmod; then
		a2enmod rewrite;
		service apache2 restart
fi;

savedAptMark="$(apt-mark showmanual)";

apt-get update;

apt-get install -y --no-install-recommends \
		libfreetype6-dev \
		libjpeg-dev \
		libpng-dev \
		libpq-dev \
		libzip-dev \

docker-php-ext-configure gd \
  --with-freetype-dir=/usr \
  --with-jpeg-dir=/usr \
  --with-png-dir=/usr \

docker-php-ext-install -j "$(nproc)" \
		gd \
		opcache \
		pdo_mysql \
		pdo_pgsql \
		zip \
