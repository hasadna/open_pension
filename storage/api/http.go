package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"storage/log"
)


func ServeFile(c echo.Context) error {
	db := GetDbConnection()

	log.Info(fmt.Sprintf("Serving the file %s", c.Param("id")))

	var file File

	db.First(&file, c.Param("id"))
	return c.File(file.Path)
}

func StoreFile(c echo.Context) error {
	log.Info("Starting to store a file")

	// First, create the upload folder.
	createFolderForDownloading()

	// Connect to the DB.
	db := GetDbConnection()
	defer db.Close()

	fileFolder := GetEnv("FILE_FOLDER_PATH")

	file, err := c.FormFile("file")
	if err != nil {
		log.Error(err)
		return err
	}

	src, err := file.Open()
	if err != nil {
		log.Error(err)
		return err
	}

	defer src.Close()

	// Create the path destination and mak sure we can copy the fie to the desired path.
	path, filename, err := storeFileToDisk(fileFolder, file.Filename, src)

	if err != nil {
		log.Error(err)
		return err
	}

	// Create the base response object in which we will append files.
	response := &FilesResponse{Files: []FileResponse{}}

	err = storeFile(filename, path, fileFolder, src, db, response)
	if err != nil {
		log.Error(err)
		return err
	}

	return c.JSON(http.StatusCreated, response)
}
