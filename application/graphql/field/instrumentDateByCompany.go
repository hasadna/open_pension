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
			"id":                   &graphql.Field{Type: graphql.ID},
		},
		Description: "Instrument date by company fields",
	},
)

func InstrumentDateByCompanies(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(instrumentDateByCompany),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var instrumentDateByCompanies []*Models.InstrumentDateByCompany

			if err := db.Find(&instrumentDateByCompanies).Error; err != nil {
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
				Type: graphql.Int,
				Description: "Filter instrument date by company by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			instrumentDateByCompany := Models.InstrumentDateByCompany{}

			if err := db.First(&instrumentDateByCompany, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return instrumentDateByCompany, nil
		},
		Description: "Getting data of a single instrument date by company entry",
	}
}
