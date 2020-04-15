package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/graphql/field"
	"github.com/jinzhu/gorm"
)

func Query(db *gorm.DB) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"companies":                    field.Companies(db),
			"company":                      field.Company(db),
			"countries":                    field.Countries(db),
			"country":                      field.Country(db),
			"funds":                        field.Funds(db),
			"fund":                         field.Fund(db),
			"instruments":                  field.Instruments(db),
			"instrument":                   field.Instrument(db),
			"instrument_date_by_companies": field.InstrumentDateByCompanies(db),
			"instrument_date_by_company":   field.InstrumentDateByCompany(db),
			"markets":                      field.Markets(db),
			"market":                       field.Market(db),
		},
	})
}
