#!/usr/bin/env bash

composer global require drupal/coder
composer global update drupal/coder --prefer-source

export PATH="$PATH:$HOME/.composer/vendor/bin"

composer global require drupal/coder:^8.3.1
composer global require dealerdirect/phpcodesniffer-composer-installer

PHP CodeSniffer Config installed_paths set to ~/.composer/vendor/drupal/coder/coder_sniffer

phpcs -i
