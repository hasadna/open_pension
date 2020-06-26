cd web
../vendor/bin/drush fra -y
../vendor/bin/drush reclamation:import --all
../vendor/bin/drush open_pension_blog:import
../vendor/bin/drush cset gatsby.settings server_url http://gatsby
