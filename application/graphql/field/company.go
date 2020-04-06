package field

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
)

var company = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Companies",
		Fields: graphql.Fields{
			"id":                   &graphql.Field{Type: graphql.ID},
			"name":                 &graphql.Field{Type: graphql.String},
			"company_local_number": &graphql.Field{Type: graphql.String},
			"company_lei":          &graphql.Field{Type: graphql.String},
			"country":              &graphql.Field{Type: graphql.ID},
			"domain":               &graphql.Field{Type: graphql.String},
			"company_type":         &graphql.Field{Type: graphql.String},
			"created_at":           &graphql.Field{Type: graphql.DateTime},
			"updated_at":           &graphql.Field{Type: graphql.DateTime},
			"deleted_at":           &graphql.Field{Type: graphql.DateTime},
		},
		Description: "Company fields",
	},
)

func Companies(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(company),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var companies []*Models.Company

			if err := db.Find(&companies).Error; err != nil {
				panic(err)
			}

			return companies, nil
		},
		Description: "A list of companies description",
	}
}

func Company(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: company,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.Int,
				Description: "Filter company by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			company := Models.Company{}

			if err := db.First(&company, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return company, nil
		},
		Description: "Getting data of a single company entry",
	}
}
