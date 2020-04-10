package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/graphql/mutation"
)

type Result struct {
	Data string `json:"data"`
}

func Mutation() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"create": &graphql.Field{
				Type:        mutation.Results(),
				Description: "Process a JSON data into the DB",
				Args: graphql.FieldConfigArgument{
					"input": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					result := Result{
						Data: "Passed",
					}
					return result, nil
				},
			},
		},
	})
}
