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

func MigrateProcessedObject(parsedPayload Payload) Result {

	fmt.Println(parsedPayload)

	result := Result{Data: "Passed", Error: ""}
	return result
}
