#!/usr/bin/env bash
# Installing drupal on the local installation.

cd web
../vendor/bin/drush si open_pension --db-url="mysql://root:root@127.0.0.1/open_pension_cms" --account-pass=admin --account-name=admin
