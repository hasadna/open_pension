FROM golang:1.15.3

RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /app
 
WORKDIR /app
 
ADD . /app

RUN go build ./storage.go
RUN go build ./kafkaListener.go
RUN go build ./queue.go

RUN chmod +x /app/storage
RUN chmod +x /app/kafkaListener

ADD supervisor.conf /etc/supervisor.conf

CMD ["supervisord", "-c", "/etc/supervisor.conf"]
