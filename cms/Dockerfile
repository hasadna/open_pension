FROM drupal:8.7.3-apache

# Install git for composer packages.
RUN apt-get update && \
    apt-get install git-core --assume-yes

WORKDIR /var/www/html

# Install composer.
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"

COPY ./drupal .

# Install composer dependacies.
RUN php composer.phar global require hirak/prestissimo && \
    php composer.phar install --no-dev

COPY ./entrypoint.sh .
RUN chmod +x entrypoint.sh && chown www-data:www-data entrypoint.sh
RUN ls -lah && echo $USER

ENTRYPOINT ["/var/www/html/entrypoint.sh"]
