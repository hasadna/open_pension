#!/bin/sh

echo "[run] go to project folder"
cd /home/app/server

echo "Waiting for DB connection"
while ! echo exit | nc $POSTGRES_HOST 5432;
do
    echo "DB still off-line....";
    sleep 10;
done

echo "[run] Migrate DB"
python manage.py migrate

echo "[run] Collect static files"
python manage.py collectstatic --noinput

echo "[run] create superuser"
echo "from django.contrib.auth.models import User
if not User.objects.filter(username='admin').count():
    User.objects.create_superuser('admin', 'admin@example.com', 'pass')
" | python manage.py shell

echo "[run] Starting Up server Django at 80"
gunicorn config.wsgi -b 0.0.0.0:80
