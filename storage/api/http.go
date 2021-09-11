package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
)


func ServeFile(c echo.Context) error {
	db := GetDbConnection()
	//
	var file File
	fmt.Println(file)
	//
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

	// Create the path destination and mak sure we can copy the fie to the desired path.
	path, filename, err := storeFileToDisk(fileFolder, file.Filename, src)

	if err != nil {
		return err
	}

	// Create the base response object in which we will append files.
	response := &FilesResponse{Files: []FileResponse{}}

	err = storeFile(filename, path, fileFolder, src, db, response)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, response)
}
