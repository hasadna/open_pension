#!/usr/bin/env bash

# Install PostgreSQL
apt-get -y install libpq-dev python-dev
apt-get -y install postgresql postgresql-contrib

# Configure PostgreSQL
/etc/init.d/postgresql restart
PGPASSWORD=postgres psql -h localhost -Upostgres -c "CREATE DATABASE open_pension"
PGPASSWORD=postgres psql -h localhost -Upostgres -c "ALTER USER postgres WITH PASSWORD 'postgres'"

# Install nginx
apt-get install -y nginx

# Configure nginx
cat /usr/src/django_project.conf > /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/django_project.conf
service nginx start

# Install django dependencies.
cd /usr/src/server && pip install -r requirements.txt

# Configure Django
cd /usr/src/server
python manage.py migrate
python manage.py collectstatic --noinput

# Create superuser
echo "from django.contrib.auth.models import User
if not User.objects.filter(username='admin').count():
    User.objects.create_superuser('admin', 'admin@example.com', 'pass')
" | python manage.py shell

# Run the gunicorn server
/usr/local/bin/gunicorn config.wsgi:application -w 2 -b :8000 --reload &

# Install Node.js dependencies.
cd /usr/src/client && npm install -g webpack webpack-dev-server typings typescript
npm install
npm start
