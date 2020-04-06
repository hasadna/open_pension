package field

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
)

var fund = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Fund",
		Fields: graphql.Fields{
			"id":                   &graphql.Field{Type: graphql.ID},
		},
		Description: "Fund fields",
	},
)

func Funds(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(fund),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var funds []*Models.Fund

			if err := db.Find(&funds).Error; err != nil {
				panic(err)
			}

			return funds, nil
		},
		Description: "A list of Funds",
	}
}

func Fund(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: fund,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.Int,
				Description: "Filter fund by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			fund := Models.Fund{}

			if err := db.First(&fund, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return fund, nil
		},
		Description: "Getting data of a single fund entry",
	}
}
