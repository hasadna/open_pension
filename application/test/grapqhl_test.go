package test

import (
	"encoding/json"
	"fmt"
	GraphQlContrib "github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/graphql"
	"github.com/hasadna/open_pension/application/graphql/mutation"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

type GraphQlTestSuite struct {
	DbBasedTestSuite
}

func ExecuteQuery(db *gorm.DB, query string) *GraphQlContrib.Result {
	schema, err := GraphQlContrib.NewSchema(
		GraphQlContrib.SchemaConfig{
			Query:    graphql.Query(db),
			Mutation: mutation.Mutation(db),
		},
	)

	if err != nil {
		panic(err)
	}

	result := GraphQlContrib.Do(GraphQlContrib.Params{
		Schema:        schema,
		RequestString: query,
	})

	return result
}

type TestingLoop struct {
	Query   string
	Results string
}

// Testing the DB connection.
func (suite *GraphQlTestSuite) TestQuery() {

	content, _ := ioutil.ReadFile("./dummy_json.json")
	text := string(content)
	payload, _ := mutation.JsonStringParse(text)
	mutation.MigrateProcessedObject(payload, suite.DB)

	queries := map[int]TestingLoop{
		0: TestingLoop{
			Query: `query { funds { fund_name } }`,
			Results: "{\"data\":{\"funds\":[{\"fund_name\":\"מקפת מרכז\"}]}}\n",
		},
		1: TestingLoop{
			Query: `query { instrument(id:1) { instrument_name } }`,
			Results: "{\"data\":{\"instrument\":{\"instrument_name\":\"בנק הפועלים בע\\\"מ\"}}}\n",
		},
	}

	e := echo.New()
	h := echo.WrapHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			panic(err)
		}
		results := ExecuteQuery(suite.DB, fmt.Sprintf("%s", b))
		json.NewEncoder(w).Encode(results)
	}))

	for _, testingLoop := range queries {
		req := httptest.NewRequest(http.MethodPost, "/graphql", strings.NewReader(testingLoop.Query))
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)

		if assert.NoError(suite.T(), h(c)) {
			assert.Equal(suite.T(), http.StatusOK, rec.Code)
			assert.Equal(suite.T(), testingLoop.Results, rec.Body.String())
		}
	}
}

func (suite *GraphQlTestSuite) TestMutation() {
	// todo.
}

func TestGraphQl(t *testing.T) {
	suite.Run(t, new(GraphQlTestSuite))
}
