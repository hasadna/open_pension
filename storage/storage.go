package main

import (
	"fmt"
	"storage/api"
)

func main() {
	// Flow:
	// 1. Create function which receive a URL and download it. - 👍
	// 2. Write the path of the file to the DB.
	// 	a. ID
	//	b. Filename
	//	c. Path
	//	d. Downloaded
	// 3. Write an endpoint to download the file.
	// Step two:
	// 4. Listen to kafka event and trigger the flow.

	path := api.DownloadFile("https://file-examples-com.github.io/uploads/2017/02/file_example_XLSX_5000.xlsx")

	if path == "" {
		fmt.Println("The file saved has failed. Please check the logs.")
		return
	}

	fmt.Println(path)
}
