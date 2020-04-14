package test

import (
	"github.com/hasadna/open_pension/application/Models"
	"github.com/hasadna/open_pension/application/graphql/mutation"
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"log"
	"testing"
)

func TestJsonStringParse(t *testing.T) {
	// Checking parsing of a valid JSON object.
	content, err := ioutil.ReadFile("./dummy_json.json")
	if err != nil {
		log.Fatal(err)
	}

	text := string(content)
	payload, JsonErr := mutation.JsonStringParse(text)

	if JsonErr != nil {
		assert.Fail(t, "The json parsing has failed when it should not")
	}

	assert.Equal(t, payload.Caches[0].FairValue, "45299.34")

	// Checking the error with a bad JSON.
	_, JsonErr = mutation.JsonStringParse("a")
	assert.Equal(t, JsonErr.Error(), "invalid character 'a' looking for beginning of value")

}

func TestMigrateProcessedObject(t *testing.T) {
	// todo.
}

func TestProcessSheet(t *testing.T) {
	// todo.
}

func TestProcessRecord(t *testing.T) {
	// todo.
}

func TestAttachDates(t *testing.T) {

	// Testing when there's no dates at all.
	payloadRecord := mutation.PayloadRecord{}
	instrumentData := Models.InstrumentDateByCompany{}
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(t, instrumentData.ReportDate.String(), "0001-01-01 00:00:00 +0000 UTC")
	assert.Equal(t, instrumentData.PurchaseDate.String(), "0001-01-01 00:00:00 +0000 UTC")

	// Testing when we have a report date in the correct format.
	payloadRecord.Date = "25/06/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(t, instrumentData.ReportDate.String(), "1989-06-25 00:00:00 +0000 UTC")

	// Testing when we have a report date in the wrong format.
	payloadRecord.Date = "06/25/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(t, instrumentData.ReportDate.String(), "0001-01-01 00:00:00 +0000 UTC")


	// Reset the properties.
	payloadRecord = mutation.PayloadRecord{}
	instrumentData = Models.InstrumentDateByCompany{}

	// Testing when the purchase date is wrong.
	payloadRecord.PurchaseDate = "25/99/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(t, instrumentData.PurchaseDate.String(), "0001-01-01 00:00:00 +0000 UTC")

	// Testing when the purchase date is correct.
	payloadRecord.PurchaseDate = "2005-05-01 00:00:00"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(t, instrumentData.PurchaseDate.String(), "2005-05-01 00:00:00 +0000 UTC")

	// Testing when we have publishing date and purchase date.
	payloadRecord.Date = "25/06/1989"
	mutation.AttachDates(payloadRecord, &instrumentData)
	assert.Equal(t, instrumentData.PurchaseDate.String(), "2005-05-01 00:00:00 +0000 UTC")
	assert.Equal(t, instrumentData.ReportDate.String(), "1989-06-25 00:00:00 +0000 UTC")
}

func TestAttachFund(t *testing.T) {
	// todo.
}

func TestAttachInstrument(t *testing.T) {
	// todo.
}

func TestConvertStringToFloat(t *testing.T) {
	assert.Equal(t, mutation.ConvertStringToFloat("50"), 50.0)
	assert.Equal(t, mutation.ConvertStringToFloat("-50"), -50.0)
	assert.Panics(t, func(){ mutation.ConvertStringToFloat("=-50.2356") }, -50.0)
}
