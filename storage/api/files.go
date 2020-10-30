package api

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

func createFolderForDownloading() bool {

	fileFolder := GetEnv("FILE_FOLDER_PATH")

	if fileFolder == "" {
		log.Fatal("You need to set up the file path")
		return false
	}

	_, err := os.Stat(fileFolder)

	if os.IsNotExist(err) {
		err := os.Mkdir(fileFolder, 0777)

		if err != nil {
			log.Fatal(err)
			return false
		}

		log.Print("Folder was not existed but we created it any way 🕺")
		return true
	}

	log.Print("Folder already exists, returning true any way 🤷‍")
	return true
}

func createUniqueFileName(filename string) string {
	now := time.Now()
	splitFileName := strings.Split(filename, ".")
	name, ext := splitFileName[0], splitFileName[1]
	return fmt.Sprintf("%s_%d%d.%s", name, now.Unix(), now.Nanosecond(), ext)
}

// Downloading file to the disk.
func DownloadFile(url string) string {

	// Making sure the download folder exists.
	createFolderForDownloading()

	// Get the data
	resp, err := http.Get(url)

	if err != nil {
		log.Fatal(err)
		return ""
	}

	defer resp.Body.Close()

	// Create the file.
	splitFiles := strings.Split(url, "/")
	fileName := splitFiles[len(splitFiles)-1]
	uniqueFileName := createUniqueFileName(fileName)

	finalFilePath := fmt.Sprintf("%s/%s", GetEnv("FILE_FOLDER_PATH"), uniqueFileName)

	out, err := os.Create(finalFilePath)

	if err != nil {
		log.Fatal(err)
		return ""
	}

	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	if err != nil {
		log.Fatal(err)
		return ""
	}

	return finalFilePath
}
