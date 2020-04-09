package field

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
)

var market = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Market",
		Fields: graphql.Fields{
			"id":          &graphql.Field{Type: graphql.ID},
			"market_name": &graphql.Field{Type: graphql.String},
			"market_code": &graphql.Field{Type: graphql.String},
			"country":     &graphql.Field{Type: graphql.ID},
			"created_at":  &graphql.Field{Type: graphql.DateTime},
			"updated_at":  &graphql.Field{Type: graphql.DateTime},
			"deleted_at":  &graphql.Field{Type: graphql.DateTime},
		},
		Description: "Market fields",
	},
)

func Markets(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(market),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var market []*Models.Market

			if err := db.Find(&market).Error; err != nil {
				panic(err)
			}

			return market, nil
		},
		Description: "A list of markets",
	}
}

func Market(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: market,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type:         graphql.Int,
				Description:  "Filter market by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			market := Models.Market{}

			if err := db.First(&market, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return market, nil
		},
		Description: "Getting data of a market entry",
	}
}
