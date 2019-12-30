#!/usr/bin/env bash
cd ../drupal/web

export SIMPLETEST_DB=mysql://root:root@localhost/open_pension
export SIMPLETEST_BASE_URL=http://localhost/open_pension/cms/drupal/web

../vendor/bin/phpunit -c ./core/phpunit.xml.dist ./profiles/open_pension/modules/open_pension_files  --filter=ManageUploadedFilesViewTest --verbose
