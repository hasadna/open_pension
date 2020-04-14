package test

import (
	"github.com/hasadna/open_pension/application/Models"
	"github.com/hasadna/open_pension/application/api"
	"github.com/hasadna/open_pension/application/graphql/mutation"
	"github.com/jinzhu/gorm"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"io/ioutil"
	"log"
	"os"
	"testing"
)

type ProcessingTestSuite struct {
	suite.Suite
	DB *gorm.DB
}

func (suite *ProcessingTestSuite) SetupTest() {
	suite.DB = GetSqliteConnection()
	api.Migrate(suite.DB)
}

func (suite *ProcessingTestSuite) TearDownTest() {
	err := os.Remove(DbFilePath)

	if err != nil {
		panic(err)
	}

	suite.DB.Close()
}

func (suite *ProcessingTestSuite) TestJsonStringParse() {
	// Checking parsing of a valid JSON object.
	content, err := ioutil.ReadFile("./dummy_json.json")
	if err != nil {
		log.Fatal(err)
	}

	text := string(content)
	payload, JsonErr := mutation.JsonStringParse(text)

	if JsonErr != nil {
		assert.Fail(suite.T(), "The json parsing has failed when it should not")
	}

	assert.Equal(suite.T(), payload.Caches[0].FairValue, "45299.34")

	// Checking the error with a bad JSON.
	_, JsonErr = mutation.JsonStringParse("a")
	assert.Equal(suite.T(), JsonErr.Error(), "invalid character 'a' looking for beginning of value")
}

func (suite *ProcessingTestSuite) TestMigrateProcessedObject() {
	content, _ := ioutil.ReadFile("./dummy_json.json")
	text := string(content)
	payload, _ := mutation.JsonStringParse(text)
	result := mutation.MigrateProcessedObject(payload, suite.DB)

	var instrument Models.InstrumentDateByCompany

	suite.DB.
		Preload("Fund").
		Preload("InstrumentNumber").
		Preload("InstrumentNumber.IssuerNumber").
		Preload("InstrumentNumber.Market").
		Preload("InvestingCompany").
		Where(Models.InstrumentDateByCompany{FairValue: 45299.34}).
		Find(&instrument)

	assert.Equal(suite.T(), instrument.Fund.FundName, "מקפת מרכז")
	assert.Equal(suite.T(), instrument.Fund.FundNumber, "מגדל מקפת - מרכז")

	assert.Equal(suite.T(), instrument.InstrumentNumber.InstrumentNumber, "34112000")
	assert.Equal(suite.T(), instrument.InstrumentNumber.InvestmentType, "מזומנים")
	assert.Equal(suite.T(), instrument.InstrumentNumber.InstrumentName, "בנק הפועלים בע\"מ")

	assert.Equal(suite.T(), instrument.InvestingCompany.CompanyLocalNumber, "12")

	assert.Equal(suite.T(), instrument.InstrumentNumber.IssuerNumber.CompanyLocalNumber, instrument.InvestingCompany.CompanyLocalNumber)
	assert.Equal(suite.T(), instrument.ReportDate.String(), "2019-06-30 00:00:00 +0000 UTC")

	assert.Equal(suite.T(), result.Data, "Passed")
}

func (suite *ProcessingTestSuite) TestAttachDates() {

	// Testing when there's no dates at all.
	payloadRecord := mutation.PayloadRecord{}
	instrumentData := Models.InstrumentDateByCompany{}
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(suite.T(), instrumentData.ReportDate.String(), "0001-01-01 00:00:00 +0000 UTC")
	assert.Equal(suite.T(), instrumentData.PurchaseDate.String(), "0001-01-01 00:00:00 +0000 UTC")

	// Testing when we have a report date in the correct format.
	payloadRecord.Date = "25/06/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(suite.T(), instrumentData.ReportDate.String(), "1989-06-25 00:00:00 +0000 UTC")

	// Testing when we have a report date in the wrong format.
	payloadRecord.Date = "06/25/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(suite.T(), instrumentData.ReportDate.String(), "0001-01-01 00:00:00 +0000 UTC")

	// Reset the properties.
	payloadRecord = mutation.PayloadRecord{}
	instrumentData = Models.InstrumentDateByCompany{}

	// Testing when the purchase date is wrong.
	payloadRecord.PurchaseDate = "25/99/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(suite.T(), instrumentData.PurchaseDate.String(), "0001-01-01 00:00:00 +0000 UTC")

	// Testing when the purchase date is correct.
	payloadRecord.PurchaseDate = "2005-05-01 00:00:00"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(suite.T(), instrumentData.PurchaseDate.String(), "2005-05-01 00:00:00 +0000 UTC")

	// Testing when we have publishing date and purchase date.
	payloadRecord.Date = "25/06/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(suite.T(), instrumentData.PurchaseDate.String(), "2005-05-01 00:00:00 +0000 UTC")
	assert.Equal(suite.T(), instrumentData.ReportDate.String(), "1989-06-25 00:00:00 +0000 UTC")
}

func (suite *ProcessingTestSuite) TestConvertStringToFloat() {
	assert.Equal(suite.T(), mutation.ConvertStringToFloat("50"), 50.0)
	assert.Equal(suite.T(), mutation.ConvertStringToFloat("-50"), -50.0)
	assert.Panics(suite.T(), func() { mutation.ConvertStringToFloat("=-50.2356") }, -50.0)
}

func TestProcessing(t *testing.T) {
	suite.Run(t, new(ProcessingTestSuite))
}
