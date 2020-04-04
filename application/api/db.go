package api

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)


func GetDbConnection() *gorm.DB {

	// todo: pull from the env data.
	db, err := gorm.Open("mysql", "root:root@/open_pension_application?charset=utf8&parseTime=True&loc=Local")

	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %s", err))
	}

	return db
}
