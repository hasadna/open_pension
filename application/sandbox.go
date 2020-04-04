package main

import (
	_ "github.com/go-sql-driver/mysql"
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

	db.Save(&Models.Company{CompanyName: "a"})
}