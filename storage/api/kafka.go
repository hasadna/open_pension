package api

func SendMessage() {
	//err := godotenv.Load()
	//if err != nil {
	//	log.Fatal("Error loading .env file")
	//}
	//
	//c, err := kafka.NewConsumer(&kafka.ConfigMap{
	//	"bootstrap.servers": "localhost",
	//	"group.id":          os.Getenv("KAFKA_GROUP"),
	//	"auto.offset.reset": "earliest",
	//})
	//
	//if err != nil {
	//	panic(err)
	//}
	//
	//c.SubscribeTopics([]string{os.Getenv("KAFKA_LISTEN_TOPIC")}, nil)
	//
	//for {
	//	msg, err := c.ReadMessage(-1)
	//	if err == nil {
	//		fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
	//	} else {
	//		// The client will automatically try to recover from all errors.
	//		fmt.Printf("Consumer error: %v (%v)\n", err, msg)
	//	}
	//}
	//
	//c.Close()
}
