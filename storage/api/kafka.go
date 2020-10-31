package api

import (
	"context"
	"fmt"
	kafkaProducer "github.com/confluentinc/confluent-kafka-go/kafka"
	kafkaConsumer "github.com/segmentio/kafka-go"
	"log"
)

func ListenToMessages() {
	db := GetDbConnection()

	r := kafkaConsumer.NewReader(kafkaConsumer.ReaderConfig{
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

func SendMessage(fileId uint) {
	p, err := kafkaProducer.NewProducer(&kafkaProducer.ConfigMap{"bootstrap.servers": GetEnv("KAFKA_HOST")})
	if err != nil {
		panic(err)
	}

	defer p.Close()

	topic := GetEnv("KAFKA_BROADCAST_TOPIC")
	p.Produce(&kafkaProducer.Message{
		TopicPartition: kafkaProducer.TopicPartition{Topic: &topic, Partition: kafkaProducer.PartitionAny},
		Value:          []byte(fmt.Sprintf("%d", fileId)),
	}, nil)

	// Wait for message deliveries before shutting down
	p.Flush(15 * 1000)
}
