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
	db.Model(&Models.Company{}).AddForeignKey("country_id", "country(id)", "NO ACTION", "NO ACTION")

	db.Model(&Models.Fund{}).AddForeignKey("executive_body_id", "company(id)", "NO ACTION", "NO ACTION")

	db.Model(&Models.Instrument{}).AddForeignKey("market_id", "market(id)", "NO ACTION", "NO ACTION")
	db.Model(&Models.Instrument{}).AddForeignKey("issuer_number_id", "company(id)", "NO ACTION", "NO ACTION")

	db.Model(&Models.Market{}).AddForeignKey("country_id", "country(id)", "CASCADE", "NO ACTION")

	db.Model(&Models.InstrumentDateByCompany{}).AddForeignKey("investing_company_id", "company(id)", "NO ACTION", "NO ACTION")
	db.Model(&Models.InstrumentDateByCompany{}).AddForeignKey("instrument_number_id", "instrument(id)", "NO ACTION", "NO ACTION")
	db.Model(&Models.InstrumentDateByCompany{}).AddForeignKey("fund_id", "fund(id)", "NO ACTION", "NO ACTION")
}
