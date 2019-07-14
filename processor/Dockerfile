FROM python:3.7-alpine

LABEL maintainer="http://www.hasadna.org.il/"

ENV APP_NAME "processor"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

WORKDIR $APP_DIR
COPY requirements.txt $APP_DIR/requirements.txt
RUN pip --no-cache-dir install -r requirements.txt

COPY . $APP_DIR

RUN chmod +x entrypoint.sh

EXPOSE 80
CMD ["/home/app/processor/entrypoint.sh"]
