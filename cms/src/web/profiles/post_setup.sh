../vendor/bin/drush fra -y
../vendor/bin/drush reclamation:import --all
../vendor/bin/drush open_pension_migrate:migrate
../vendor/bin/drush cset gatsby.settings server_url http://localhost:8000 -y
