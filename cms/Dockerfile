FROM drupal:8.7.3-apache

# Install git for composer packages.
RUN apt-get update && \
    apt-get install git-core --assume-yes

WORKDIR /var/www/html
COPY ./entrypoint.sh .

RUN chmod +x entrypoint.sh


RUN ls -al
RUN pwd

# Install composer.
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php composer-setup.php --install-dir=/bin --filename=composer && \
    php -r "unlink('composer-setup.php');"

COPY ./drupal .

# Install composer dependacies.
RUN composer install

ENTRYPOINT ["/var/www/html/entrypoint.sh"]
