#!/usr/bin/env bash
cd ../drupal

phpcbf --standard=Drupal ../drupal/web/profiles/open_pension/ --colors
