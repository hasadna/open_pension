#!/usr/bin/env bash

# Install django dependencies.
cd /usr/src/server && pip install -r requirements.txt

# Install Node.js dependencies.
cd /usr/src/client && npm install
npm install -g webpack

# Install PostgreSQL
apt-get -y install libpq-dev python-dev
apt-get -y install postgresql postgresql-contrib

# Configure PostgreSQL
/etc/init.d/postgresql restart
su - postgres
psql postgres -c "CREATE DATABASE open_pension"
psql postgres -c"ALTER USER postgres WITH PASSWORD 'postgres'"
exit

# Install nginx
apt-get install -y nginx

# Configure nginx
cat /usr/src/django_project.conf > /etc/nginx/sites-enabled/default

# temp
#cd /usr/src/client
#npm start

# Configure Django
cd /usr/src/server
python manage.py syncdb --noinput
python manage.py migrate
python manage.py collectstatic --noinput

# Create superuser
echo "from django.contrib.auth.models import User
if not User.objects.filter(username='admin').count():
    User.objects.create_superuser('admin', 'admin@example.com', 'pass')
" | python manage.py shell

# Run the gunicorn server
/usr/local/bin/gunicorn config.wsgi:application -w 2 -b :80 --reload
