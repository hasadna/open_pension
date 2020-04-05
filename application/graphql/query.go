package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/graphql/field"
	"github.com/jinzhu/gorm"
)

func newQuery(db *gorm.DB) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"companies": field.Companies(db),
			"company": field.Company(db),
		},
	})
}
