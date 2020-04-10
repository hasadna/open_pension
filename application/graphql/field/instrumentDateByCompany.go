package field

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
)

var instrumentDateByCompany = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "InstrumentDateByCompany",
		Fields: graphql.Fields{
			"id": &graphql.Field{Type: graphql.ID},
			"invest_company": &graphql.Field{
				Type: company,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return p.Source.(Models.InstrumentDateByCompany).InvestingCompany, nil
				},
			},
			"currency":                     &graphql.Field{Type: graphql.String},
			"duration":                     &graphql.Field{Type: graphql.Float},
			"fair_value":                   &graphql.Field{Type: graphql.Int},
			"instrument_number":            &graphql.Field{Type: graphql.ID},
			"fund_id":                      &graphql.Field{Type: graphql.ID},
			"nominal_value":                &graphql.Field{Type: graphql.Float},
			"price":                        &graphql.Field{Type: graphql.Float},
			"purchase_date":                &graphql.Field{Type: graphql.DateTime},
			"rate":                         &graphql.Field{Type: graphql.Float},
			"fund_rate_holding":            &graphql.Field{Type: graphql.Float},
			"rate_funding_instrument_type": &graphql.Field{Type: graphql.Float},
			"rate_register":                &graphql.Field{Type: graphql.Float},
			"report_date":                  &graphql.Field{Type: graphql.DateTime},
			"created_at":                   &graphql.Field{Type: graphql.DateTime},
			"updated_at":                   &graphql.Field{Type: graphql.DateTime},
			"deleted_at":                   &graphql.Field{Type: graphql.DateTime},
		},
		Description: "Instrument date by company fields",
	},
)

func InstrumentDateByCompanies(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(instrumentDateByCompany),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var instrumentDateByCompanies []Models.InstrumentDateByCompany

			if err := db.
				Preload("InvestingCompany").
				Find(&instrumentDateByCompanies).
				Error; err != nil {
				panic(err)
			}

			return instrumentDateByCompanies, nil
		},
		Description: "A list of instrument date by companies",
	}
}

func InstrumentDateByCompany(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: instrumentDateByCompany,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type:         graphql.Int,
				Description:  "Filter instrument date by company by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			instrumentDateByCompany := Models.InstrumentDateByCompany{}

			if err := db.
				Preload("InvestingCompany").
				First(&instrumentDateByCompany, p.Args["id"]).
				Error; err != nil {
				panic(err)
			}

			return instrumentDateByCompany, nil
		},
		Description: "Getting data of a single instrument date by company entry",
	}
}
