cd web
../vendor/bin/drush fra -y
../vendor/bin/drush reclamation:import --all
../vendor/bin/drush open_pension_migrate:migrate
../vendor/bin/drush cset gatsby.settings server_url http://blog -y
../vendor/bin/drush cset gatsby.settings incrementalbuild_url http://blog:8000/__refresh -y
