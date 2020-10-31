package api

import (
	"crypto/tls"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

// Creating the download folder path.
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
	return true
}

// Creating a unique file name from a giving file name.
func CreateUniqueFileName(filename string) string {
	now := time.Now()
	splitFileName := strings.Split(filename, ".")

	if len(splitFileName) == 1 {
		return fmt.Sprintf("unrecognize_file%d%d.xlsx", now.Unix(), now.Nanosecond())
	}

	name, ext := splitFileName[0], splitFileName[1]
	return fmt.Sprintf("%s_%d%d.%s", name, now.Unix(), now.Nanosecond(), ext)
}

// Generating a unique filename form a given path or a URL.
func GetFileNameFromPathOrUrl(pathOrUrl string) string {
	splitFiles := strings.Split(pathOrUrl, "/")
	return splitFiles[len(splitFiles)-1]
}

// Downloading file to the disk.
func DownloadFile(url string) string {

	// Making sure the download folder exists.
	createFolderForDownloading()

	// Get the data.
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr}
	resp, err := client.Get(url)

	if err != nil {
		log.Fatal(err)
		return ""
	}

	defer resp.Body.Close()

	// Create the file.
	fileName := GetFileNameFromPathOrUrl(url)
	uniqueFileName := CreateUniqueFileName(fileName)

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
