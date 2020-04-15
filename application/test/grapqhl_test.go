package test

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"testing"
)

type GraphQlTestSuite struct {
	DbBasedTestSuite
}

// Testing the DB connection.
func (suite *ProcessingTestSuite) TestQuery() {
	assert.Equal(suite.T(), 1, 1)
}

func (suite *ProcessingTestSuite) TestMutation() {
	assert.Equal(suite.T(), 1, 1)
}

func TestGraphQl(t *testing.T) {
	suite.Run(t, new(GraphQlTestSuite))
}

