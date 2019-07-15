#!/usr/bin/env bash
cd ../drupal/web

export SIMPLETEST_DB=mysql://user:password@cms_db/db

../vendor/bin/phpunit -c ./core/phpunit.xml.dist ./profiles/open_pension --verbose
