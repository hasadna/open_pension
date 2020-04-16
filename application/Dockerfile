FROM golang:1.13
 
RUN mkdir -p /app
 
WORKDIR /app
 
ADD . /app

RUN rm .env && cp .docker.env .env

RUN go build ./server.go

ENTRYPOINT ["./server"]