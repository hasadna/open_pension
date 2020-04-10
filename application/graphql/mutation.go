package graphql

import (
	"encoding/json"
	"fmt"
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/graphql/mutation"
)

type Result struct {
	Data string `json:"data"`
	Error string `json:"error"`
}

type Payload struct {
	Caches []PayloadRecord `json:"מזומנים"`
}

type PayloadRecord struct {
	Index                string `json:"index"`
	Israel               bool   `json:"israel"`
	InstrumentName       string `json:"Instrument name"`
	InstrumentNumber     string `json:"Instrument number"`
	IssuerNumber         string `json:"Issuer number"`
	RatingAgencies       string `json:"Rating agencies"`
	Currency             string `json:"Currency"`
	Rate                 string `json:"Rate"`
	YieldToMaturity      string `json:"Yield to maturity"`
	FairValue            string `json:"Fair value"`
	RateOfInstrumentType string `json:"Rate of instrument type"`
	Investment           string `json:"Investment"`
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
					payload := params.Args["input"].(string)
					var parsedPayload Payload
					var result Result

					err := json.Unmarshal([]byte(payload), &parsedPayload)

					if err != nil {
						result.Data = "failed"
						result.Error = fmt.Sprintf("%s", err)
						return result, nil
					}
					// todo: cover more entries
					// 	Covnert records to the DB.

					result.Data = "passed"
					return result, nil
				},
			},
		},
	})
}
