package field

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
)

var country = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Country",
		Fields: graphql.Fields{
			"id":             &graphql.Field{Type: graphql.ID},
			"name":           &graphql.Field{Type: graphql.String},
			"iso2code":       &graphql.Field{Type: graphql.String},
			"iso3code":       &graphql.Field{Type: graphql.String},
			"continent_name": &graphql.Field{Type: graphql.String},
			"created_at":     &graphql.Field{Type: graphql.DateTime},
			"updated_at":     &graphql.Field{Type: graphql.DateTime},
			"deleted_at":     &graphql.Field{Type: graphql.DateTime},
		},
		Description: "Country fields",
	},
)

func Countries(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(country),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var countries []*Models.Country

			if err := db.Find(&countries).Error; err != nil {
				panic(err)
			}

			return countries, nil
		},
		Description: "A list of countries description",
	}
}

func Country(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: country,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type:         graphql.Int,
				Description:  "Filter country by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			country := Models.Country{}

			if err := db.First(&country, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return country, nil
		},
		Description: "Getting data of a single country entry",
	}
}
