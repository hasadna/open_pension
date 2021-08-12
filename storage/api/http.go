package api

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
)


type FileResponse struct {
	ID       uint   `json:"ID"`
	Filename string `json:"filename"`
}

type FilesResponse struct {
	Files []FileResponse `json:"files"`
}

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

	// Create the path destination and mak sure we can copy the fie to the desired path.
	filename := CreateUniqueFileName(file.Filename)

	if strings.HasSuffix(filename, ".zip") {
		// todo: extract all the file and handle it.
		return c.JSON(http.StatusCreated, nil)
	} else {
		res, err := storeFile(fileFolder, filename, err, src, db)

		if err != nil {
			return err
		}

		response := FilesResponse{Files: []FileResponse{res}}

		return c.JSON(http.StatusCreated, response)
	}
}

func storeFile(fileFolder string, filename string, err error, src multipart.File, db *gorm.DB) (FileResponse, error) {
	path := fmt.Sprintf("%s/%s", fileFolder, filename)

	dst, err := os.Create(path)
	if err != nil {
		return FileResponse{}, err
	}
	defer dst.Close()

	// Copying the file.
	if _, err = io.Copy(dst, src); err != nil {
		return FileResponse{}, err
	}

	// Create a record in the DB as downloaded and send the kafka event.
	var dbFile File
	db.Where(&File{
		Filename:   filename,
		Path:       path,
		Downloaded: true,
	}).FirstOrCreate(&dbFile)

	// Sending a kafka event.
	//SendMessage(dbFile)


	resp := FileResponse{ID: dbFile.ID, Filename: dbFile.Filename}

	return resp, nil
}
