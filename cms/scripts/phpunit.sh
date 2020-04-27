#!/usr/bin/env bash
cd ../src/web

export SIMPLETEST_DB=mysql://root:root@localhost/open_pension_cms
export SIMPLETEST_BASE_URL=https://open-pension-cms/


../vendor/bin/phpunit --testsuite=unit
#../vendor/bin/phpunit -c ./core/phpunit.xml.dist ./profiles/open_pension --verbose
