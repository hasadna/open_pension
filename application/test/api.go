package test

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
	"os"
)

func GetTestingDbConnection() *gorm.DB {

	godotenv.Load("../.env")

	connectionString := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&parseTime=True&loc=Local",
		os.Getenv("TEST_DB_USER"),
		os.Getenv("TEST_DB_PASSWORD"),
		os.Getenv("TEST_DB_HOST"),
		os.Getenv("TEST_DB_NAME"))

	db, err := gorm.Open("mysql", connectionString)

	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %s", err))
	}

	return db.Set("gorm.auto_preload", true)
}

func ResetDB(db *gorm.DB) {
	godotenv.Load("../.env")

	db.Exec(fmt.Sprintf("drop schema %s;", os.Getenv("TEST_DB_NAME")))
	db.Exec(fmt.Sprintf("create schema %s;", os.Getenv("TEST_DB_NAME")))
}
