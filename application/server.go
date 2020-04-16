package main

import (
	"github.com/hasadna/open_pension/application/Models"
	"github.com/hasadna/open_pension/application/api"
	"github.com/hasadna/open_pension/application/graphql"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"log"
)

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


func main() {
	db := api.GetDbConnection()

	// Migrating content.
	Migrate(db)

	// Firing up the server.
	e := echo.New()

	h, err := graphql.HandlerGraphQlRequest(db)
	logFatal(err)

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.POST("/graphql", echo.WrapHandler(h))

	if err := e.Start(":3000"); err != nil {
		log.Fatalln(err)
	}

	defer db.Close()

}

func logFatal(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}