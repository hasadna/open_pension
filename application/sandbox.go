package main

import (
	"encoding/json"
	"fmt"
	"github.com/hasadna/open_pension/application/api"
	"github.com/hasadna/open_pension/application/graphql/mutation"
	"io/ioutil"
	"os"
)

func main() {

	jsonFile, err := os.Open("510773922_gsum_0118.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	// json data
	var obj mutation.Payload

	// unmarshall it
	err = json.Unmarshal(byteValue, &obj)
	if err != nil {
		fmt.Println("error:", err)
	}

	db := api.GetDbConnection()

	fmt.Println(mutation.MigrateProcessedObject(obj, db))
}
