package mutation

import (
	"encoding/json"
	"fmt"
)

// Handle the json string processing to an object.
func JsonStringParse(JsonString string) (Payload, error) {
	var parsedPayload Payload

	err := json.Unmarshal([]byte(JsonString), &parsedPayload)

	if err != nil {
		// Found an error during parsing.
		return parsedPayload, err
	}

	return parsedPayload, nil
}

func processSheet(PayloadRecords []PayloadRecord) {
	for _, payloadRecord := range PayloadRecords {
		fmt.Println(payloadRecord)
	}
}


func MigrateProcessedObject(parsedPayload Payload) Result {
	processSheet(parsedPayload.Caches)
	processSheet(parsedPayload.Field02)
	processSheet(parsedPayload.Field03)
	processSheet(parsedPayload.Field04)
	processSheet(parsedPayload.Field05)
	processSheet(parsedPayload.Field06)
	processSheet(parsedPayload.Field07)
	processSheet(parsedPayload.Field08)
	processSheet(parsedPayload.Field09)
	processSheet(parsedPayload.Field10)
	processSheet(parsedPayload.Field11)
	processSheet(parsedPayload.Field12)
	processSheet(parsedPayload.Field13)
	processSheet(parsedPayload.Field14)
	processSheet(parsedPayload.Field15)
	processSheet(parsedPayload.Field16)
	processSheet(parsedPayload.Field17)
	processSheet(parsedPayload.Field18)
	processSheet(parsedPayload.Field19)
	processSheet(parsedPayload.Field20)
	processSheet(parsedPayload.Field21)
	processSheet(parsedPayload.Field22)
	processSheet(parsedPayload.Field23)
	processSheet(parsedPayload.Field24)
	processSheet(parsedPayload.Field25)
	processSheet(parsedPayload.Field26)
	processSheet(parsedPayload.Field27)

	result := Result{Data: "Passed", Error: ""}
	return result
}
