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
			"id":          &graphql.Field{Type: graphql.ID},
			"fund_name":   &graphql.Field{Type: graphql.String},
			"fund_number": &graphql.Field{Type: graphql.String},
			"is_active":   &graphql.Field{Type: graphql.Boolean},
			"created_at":  &graphql.Field{Type: graphql.DateTime},
			"updated_at":  &graphql.Field{Type: graphql.DateTime},
			"deleted_at":  &graphql.Field{Type: graphql.DateTime},
			"executive_body": &graphql.Field{
				Type: company,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return p.Source.(Models.Fund).ExecutiveBody, nil
				},
			},
		},
		Description: "Fund fields",
	},
)

func Funds(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(fund),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var funds []Models.Fund

			if err := db.
				Preload("ExecutiveBody").
				Preload("ExecutiveBody.Country").
				Find(&funds).Error; err != nil {
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
				Type:         graphql.Int,
				Description:  "Filter fund by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			fund := Models.Fund{}

			if err := db.
				Preload("ExecutiveBody").
				Preload("ExecutiveBody.Country").
				First(&fund, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return fund, nil
		},
		Description: "Getting data of a single fund entry",
	}
}
