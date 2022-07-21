FROM alpine:3.13

WORKDIR /app

LABEL maintainer="https://www.hasadna.org.il/"

RUN apk -q update && apk add \
    openjdk8 \
    bash \
    gettext

RUN wget https://archive.apache.org/dist/kafka/2.7.0/kafka_2.12-2.7.0.tgz && \
    tar -xvf kafka_2.12-2.7.0.tgz --strip 1 &&\
    rm kafka_2.12-2.7.0.tgz

COPY entrypoint.sh server.properties.template ./

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
