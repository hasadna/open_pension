package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"io"
	"net/http"
	"os"
)

func ServeFile(c echo.Context) error {
	db := GetDbConnection()

	var file File

	db.First(&file, c.Param("id"))
	return c.File(file.Path)
}

func StoreFile(c echo.Context) error {

	// First, create the upload folder.
	createFolderForDownloading()

	// Connect to the DB.
	db := GetDbConnection()
	defer db.Close()

	fileFolder := GetEnv("FILE_FOLDER_PATH")

	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	src, err := file.Open()
	if err != nil {
		return err
	}

	defer src.Close()

	// Creat the path destination and mak sure we can copy the fie to the desired path.
	filename := CreateUniqueFileName(file.Filename)
	path := fmt.Sprintf("%s/%s", fileFolder, filename)

	dst, err := os.Create(path)
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copying the file.
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	// Create a record in the DB as downloaded and send the kafka event.

	var dbFile File
	db.Where(&File{
		Filename: filename,
		Path: path,
		Downloaded: true,
	}).FirstOrCreate(&dbFile)

	// Sending a kafka event.
	SendMessage(dbFile)

	// And.. we're done! return the response.
	encodedJSON := []byte{} // Encoded JSON from external source
	return c.JSONBlob(http.StatusCreated, encodedJSON)
}