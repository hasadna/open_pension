FROM alpine:3.11.2

WORKDIR /app

LABEL maintainer="https://www.hasadna.org.il/"

RUN apk -q update && apk add \
    openjdk8 \
    bash \
    gettext

RUN wget http://apache.mivzakim.net/kafka/2.3.0/kafka_2.12-2.3.0.tgz && \
    tar -xvf kafka_2.12-2.3.0.tgz --strip 1 &&\
    rm kafka_2.12-2.3.0.tgz

COPY entrypoint.sh server.properties.template ./

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
