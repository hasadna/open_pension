package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

func Query(db *gorm.DB) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"files": Files(db),
			"file": File(db),
		},
	})
}
