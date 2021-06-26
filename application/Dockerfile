FROM golang:1.13

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN go build ./server.go

# todo: create an entry point and for the DB state.
ENTRYPOINT ["./server"]
