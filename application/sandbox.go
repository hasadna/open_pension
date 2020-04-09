package main

import (
	"encoding/json"
	"fmt"
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

	var company Models.Company

	db.Preload("Country").Find(&company)

	//fmt.Print(company)

	b, err := json.Marshal(company)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(b))

	//db.Model(&Models.Company{}).AddForeignKey("country_id", "country(id)", "CASCADE", "CASCADE")
	//
	//country := Models.Country{Name: "a"}
	//db.Save(&country)
	//db.Save(&Models.Company{CompanyName: "a", CountryId: country.ID})
}