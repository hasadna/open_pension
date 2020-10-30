FROM golang:1.15.3
 
RUN mkdir -p /app
 
WORKDIR /app
 
ADD . /app

RUN go build ./storage.go

RUN ls -al
RUN pwd

RUN chmod +x /home/app/storage

ENTRYPOINT ["/home/app/storage"]
