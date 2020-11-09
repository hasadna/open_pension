package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"log"
	"storage/api"
	"strconv"
)

func filesToDownload(db *gorm.DB) []api.File {
	numberOfItems := api.GetEnv("FILES_PER_QUEUE")

	i, err := strconv.Atoi(numberOfItems)

	if err != nil {
		log.Fatal(err)
	}

	return api.GetUnDownloadedFiles(i, db)
}

func main() {
	db := api.GetDbConnection()
	defer db.Close()
	fileToDownload := make(chan api.File)
	stopCollectingFiles := make(chan bool)

	go func() {
		for {
			select {
			case file := <-fileToDownload:

				log.Printf("Downloading %d %s", file.ID, file.URL)

				path := api.DownloadFile(file.URL)

				if path == "" {
					fmt.Println("The file saved has failed. Please check the logs.")
					continue
				}

				file.AlterFileRecordAfterDownload(path)
				db.Save(&file)

				log.Printf("Downloaded %d %s", file.ID, file.URL)

				api.SendMessage(file)
			case <-stopCollectingFiles:
				return
			}
		}
	}()

	log.Println("Starting to collect the files for downloading")

	for _, file := range filesToDownload(db) {
		fileToDownload <- file
	}
	stopCollectingFiles <- true
}
