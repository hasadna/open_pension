package main

import (
	"fmt"
	"github.com/hasadna/open_pension/application/graphql/mutation"
)

func main() {
	jsonString := "{\"\\u05de\\u05d6\\u05d5\\u05de\\u05e0\\u05d9\\u05dd\": [{\"index\": \" \\u05d1\\u05d9\\u05e9\\u05e8\\u05d0\\u05dc\", \"israel\": true, \"line_in_file\": 13, \"Instrument name\": \"\\u05e1\\u05db\\u05d5\\u05de\\u05d9\\u05dd \\u05dc\\u05e7\\u05d1\\u05dc \\u05ea\\u05e0\\u05d5\\u05e2\\u05d5\\u05ea \\u05d1\\u05d6\\u05de\\u05df T\", \"Instrument number\": \" \", \"Issuer number\": null, \"Rating\": \"AA+IL\", \"Rating agencies\": \"\\u05de\\u05e2\\u05dc\\u05d5\\u05ea S&P\", \"Currency\": \"\\u05e9\\u05e7\\u05dc \\u05d7\\u05d3\\u05e9\", \"Rate\": null, \"Yield to maturity\": null, \"Fair value\": \"1757.5\", \"Rate of instrument type\": \"2.77\", \"Investment\": \"\\u05de\\u05d6\\u05d5\\u05de\\u05e0\\u05d9\\u05dd\", \"file_name\": \"510773922_gsum_0118.xlsx\"}]}"


	Payload, err := mutation.JsonStringParse(jsonString)

	if err != nil {
		panic(err)
	}
	fmt.Println(Payload)
}
