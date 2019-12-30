FROM tiangolo/uwsgi-nginx-flask:python3.7

LABEL maintainer="http://www.hasadna.org.il/"

COPY ./src /app

RUN pip --no-cache-dir install -r app/requirements.txt
