package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/hasadna/open_pension/application/graphql/mutation"
	"github.com/jinzhu/gorm"
)

func HandlerGraphQlRequest(db *gorm.DB) (*handler.Handler, error) {
	schema, err := graphql.NewSchema(
		graphql.SchemaConfig{
			Query:    Query(db),
			Mutation: mutation.Mutation(db),
		},
	)
	if err != nil {
		return nil, err
	}

	return handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	}), nil
}
