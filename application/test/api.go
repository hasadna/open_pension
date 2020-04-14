package test

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// Get SQLite connection just for testing. Testing with relation ships will take place against a real DB.
func GetSqliteConnection() *gorm.DB {
	db, err := gorm.Open("mysql", "/tmp/data")

	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %s", err))
	}

	return db.Set("gorm.auto_preload", true)
}
