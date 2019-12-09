FROM ubuntu:19.04

WORKDIR /app

RUN apt-get update && apt-get install -y wget openjdk-8-jdk

RUN wget http://apache.mivzakim.net/kafka/2.3.0/kafka_2.12-2.3.0.tgz \
    && tar -xvf kafka_2.12-2.3.0.tgz --strip 1

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
