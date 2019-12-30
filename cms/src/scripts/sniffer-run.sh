#!/usr/bin/env bash
cd ../drupal

phpcs --standard=Drupal ../drupal/web/profiles/open_pension/ --colors
