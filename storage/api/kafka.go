package api

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/segmentio/kafka-go"
	"log"
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

func SendMessage(file File) {
	// Starting to produce.
	topic := GetEnv("KAFKA_BROADCAST_TOPIC")
	partition := 0

	conn, err := kafka.DialLeader(context.Background(), "tcp", GetEnv("KAFKA_HOST"), topic, partition)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}

	marshal, _ := json.Marshal(file)

	conn.SetWriteDeadline(time.Now().Add(10*time.Second))
	_, err = conn.WriteMessages(
		kafka.Message{Value: marshal},
	)
	if err != nil {
		log.Fatal("failed to write messages:", err)
	}

	if err := conn.Close(); err != nil {
		log.Fatal("failed to close writer:", err)
	}
}
