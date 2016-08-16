FROM python:3.5-alpine
MAINTAINER Nir Galon <nirgn975@gmail.com>

RUN apk add --no-cache --virtual build-dependencies \
    gcc \
    musl-dev \
    python3-dev \
&& apk add --no-cache postgresql-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED 1
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt \
&& apk del build-dependencies

COPY . /usr/src/app
RUN python manage.py collectstatic --noinput

CMD ["/usr/local/bin/gunicorn config.wsgi:application", \
  "-w", "2", "-b", ":8000", "--reload"]
