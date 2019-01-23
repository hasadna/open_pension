#!/bin/sh

if [[ "$(pwd)" != "$APP_DIR" ]]
then
    echo "Navigating to project folder"
    cd $APP_DIR
fi

echo "Waiting for DB connection"
while ! echo exit | nc $POSTGRES_HOST 5432;
do
    echo "DB still off-line....";
    sleep 10;
done

echo "Running Django Migration"
python manage.py migrate

echo "Collecting static files"
python manage.py collectstatic --noinput

echo "Creating superuser"
echo "from django.contrib.auth.models import User
if not User.objects.filter(username='admin').count():
    User.objects.create_superuser('admin', 'admin@example.com', 'pass')
" | python manage.py shell

echo "Starting Up server Django at 80"
gunicorn config.wsgi -b 0.0.0.0:80
