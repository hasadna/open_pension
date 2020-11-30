package api

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func GetEnv(envKey string) string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
		return ""
	}

	return os.Getenv(envKey)
}
