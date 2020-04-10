package mutation

import "github.com/graphql-go/graphql"

func Results() *graphql.Object {
	return graphql.NewObject(
		graphql.ObjectConfig{
			Name: "Result",
			Fields: graphql.Fields{
				"data": &graphql.Field{
					Type: graphql.String,
				},
			},
		},
	)
}
