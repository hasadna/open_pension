package api

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"github.com/labstack/gommon/log"
	"os"
)

func GetDbConnection() *gorm.DB {

	godotenv.Load("../.env")

	var err error

	for i := 1; i <= 5; i++ {
		connectionString := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local",
			os.Getenv("MYSQL_USER"),
			os.Getenv("MYSQL_PASSWORD"),
			os.Getenv("MYSQL_HOST"),
			os.Getenv("MYSQL_DATABASE"))

		db, err := gorm.Open("mysql", connectionString)

		if db != nil {
			return db.Set("gorm.auto_preload", true)
		}

		log.Info(fmt.Sprintf("Failed to connect to the for in iteration No. %s. The reason: %s", i, err))

	}

	// Did not managed to connect to the DB.
	panic(fmt.Sprintf("failed to connect database after 5 attempts. The reason: %s", err))
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(
		Models.Company{},
		Models.Country{},
		Models.Fund{},
		Models.Instrument{},
		Models.InstrumentDateByCompany{},
		Models.Market{},
	)

	// Setting up foreign keys.
	db.Model(&Models.Company{}).AddForeignKey("country_id", "country(id)", "NO ACTION", "NO ACTION")

	db.Model(&Models.Fund{}).AddForeignKey("executive_body_id", "company(id)", "NO ACTION", "NO ACTION")

	db.Model(&Models.Instrument{}).AddForeignKey("market_id", "market(id)", "NO ACTION", "NO ACTION")
	db.Model(&Models.Instrument{}).AddForeignKey("issuer_number_id", "company(id)", "NO ACTION", "NO ACTION")

	db.Model(&Models.Market{}).AddForeignKey("country_id", "country(id)", "CASCADE", "NO ACTION")

	db.Model(&Models.InstrumentDateByCompany{}).AddForeignKey("investing_company_id", "company(id)", "NO ACTION", "NO ACTION")
	db.Model(&Models.InstrumentDateByCompany{}).AddForeignKey("instrument_number_id", "instrument(id)", "NO ACTION", "NO ACTION")
	db.Model(&Models.InstrumentDateByCompany{}).AddForeignKey("fund_id", "fund(id)", "NO ACTION", "NO ACTION")
}
