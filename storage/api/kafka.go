package api

import (
	"context"
	"fmt"
	"github.com/segmentio/kafka-go"
	"log"
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
			log.Fatal(err)
			break
		}

		file := SaveUrlToDb(string(m.Value), db)

		fmt.Println(file)
	}

	if err := r.Close(); err != nil {
		log.Fatal("failed to close reader:", err)
	}
}
