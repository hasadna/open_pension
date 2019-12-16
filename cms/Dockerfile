FROM drupal:8.7.3-apache

# Install git for composer packages.
RUN apt-get update && \
    apt-get install git-core netcat --assume-yes && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Install composer.
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"  && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"


# Install composer dependencies.
RUN php composer.phar global require hirak/prestissimo && \
    php composer.phar install

COPY ./entrypoint.sh .

RUN chmod +x entrypoint.sh

CMD ["/var/www/html/entrypoint.sh"]
