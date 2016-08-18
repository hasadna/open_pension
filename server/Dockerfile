FROM python:3.5-alpine
MAINTAINER Nir Galon <nirgn975@gmail.com>

RUN apk add --no-cache --virtual build-dependencies \
    gcc \
    musl-dev \
    python3-dev \
&& apk add --no-cache postgresql-dev

WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE config.settings.production
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt \
&& apk del build-dependencies

COPY . /usr/src/app
# SECRET_KEY hack -- we need collectstatic before the env var is available
RUN SECRET_KEY='x' python manage.py collectstatic --noinput && unset SECRET_KEY

CMD ["/usr/local/bin/gunicorn", "config.wsgi:application", \
  "-w", "2", "-b", ":8000", "--reload"]
