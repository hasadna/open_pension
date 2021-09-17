package log

import (
	"context"
	"encoding/json"
	"github.com/elastic/go-elasticsearch/v7"
	"github.com/elastic/go-elasticsearch/v7/esapi"
	"github.com/labstack/gommon/log"
	"strings"
	"time"
)

type Message struct {
	Text    string    `json:"text"`
	Level   string    `json:"level"`
	Service string    `json:"service"`
	Time    time.Time `json:"time"`
}

func getClient() *elasticsearch.Client {
	// todo: export this to a cached variable to keep one connection.
	cfg := elasticsearch.Config{
		Addresses: []string{
			// todo: take from env file
			"http://localhost:9200",
		},
	}
	es, _ := elasticsearch.NewClient(cfg)

	return es
}

// todo: convert this to a internal function and expose methods like Log.info. Log.Error while know to ge the error
// 	object and handle it approitialy.
func logToEs(message, level string) {

	// todo: find out how to define the strucy of the index.

	client := getClient()

	res, err := client.Info()
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()


	out, err := json.Marshal(Message{
		Level: level,
		Service: "storage",
		Text: message,
		Time: time.Now(),
	})

	if err != nil {
		panic (err)
	}

	req := esapi.IndexRequest{
		Index:      "logs",
		Body:       strings.NewReader(string(out)),
		Refresh:    "true",
	}
	req.Do(context.Background(), client)
}

func Info(text string) {
	logToEs(text, "info")
}

func Debug(text string) {
	log.Debug(text)
	logToEs(text, "debug")
}

func Warning(text string) {
	log.Warn(text)
	logToEs(text, "warning")
}

func Error(err error) {
	log.Error(err)
	logToEs(err.Error(), "info")
}
