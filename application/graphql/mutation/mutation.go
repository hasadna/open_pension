package mutation

import (
	"fmt"
	"github.com/graphql-go/graphql"
)

func Mutation() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"create": &graphql.Field{
				Type:        Results(),
				Description: "Process a JSON data into the DB",
				Args: graphql.FieldConfigArgument{
					"input": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					payload := params.Args["input"].(string)

					parsedPayload, err := JsonStringParse(payload)

					if err != nil {
						result := Result{Data: "Failed", Error: fmt.Sprintf("%s", err)}
						return result, nil
					}

					return MigrateProcessedObject(parsedPayload), nil
				},
			},
		},
	})
}
