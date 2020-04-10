package main

import (
	"github.com/hasadna/open_pension/application/Models"
	"github.com/hasadna/open_pension/application/api"
)

func main() {

	db := api.GetDbConnection()
	defer db.Close()

	// Migrating the models.
	db.AutoMigrate(
		Models.Company{},
		Models.Country{},
		Models.Fund{},
		Models.Instrument{},
		Models.InstrumentDateByCompany{},
		Models.Market{},
	)

	// Setting up foreign keys.
	db.Model(&Models.Company{}).AddForeignKey("country_id", "country(id)", "CASCADE", "CASCADE")
	db.Model(&Models.Fund{}).AddForeignKey("executive_body_id", "company(id)", "CASCADE", "CASCADE")

	db.Model(&Models.Instrument{}).AddForeignKey("market_id", "market(id)", "CASCADE", "CASCADE")
	db.Model(&Models.Instrument{}).AddForeignKey("issuer_number_id", "company(id)", "CASCADE", "CASCADE")

	db.Model(&Models.Market{}).AddForeignKey("country_id", "country(id)", "CASCADE", "CASCADE")
}
