package api

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/segmentio/kafka-go"
	"storage/log"
	"time"
)

func ListenToMessages() {
	db := GetDbConnection()

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{GetEnv("KAFKA_HOST")},
		Topic:     GetEnv("KAFKA_LISTEN_TOPIC"),
		Partition: 0,
	})

	r.SetOffset(0)

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			log.Error(err)
			break
		}

		file := SaveUrlToDb(string(m.Value), db)

		fmt.Println(file)
	}

	if err := r.Close(); err != nil {
		log.Error(err)
	}
}

func SendMessage(file File) {
	// Starting to produce.
	topic := GetEnv("KAFKA_BROADCAST_TOPIC")
	partition := 0

	conn, err := kafka.DialLeader(context.Background(), "tcp", GetEnv("KAFKA_HOST"), topic, partition)
	if err != nil {
		log.Error(err)
	}

	marshal, _ := json.Marshal(file)

	conn.SetWriteDeadline(time.Now().Add(10*time.Second))
	_, err = conn.WriteMessages(
		kafka.Message{Value: marshal},
	)
	if err != nil {
		log.Error(err)
	}

	if err := conn.Close(); err != nil {
		log.Error(err)
	}
}
