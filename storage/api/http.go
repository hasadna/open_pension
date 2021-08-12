package api

import (
	"archive/zip"
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
	path, filename, err := storeFileToDisk(fileFolder, file.Filename, src)

	if err != nil {
		return err
	}

	// Create the base response object in which we will append files.
	response := FilesResponse{Files: []FileResponse{}}

	if strings.HasSuffix(filename, ".zip") {
		r, err := zip.OpenReader(path)

		if err != nil {
			return err
		}

		defer r.Close()

		for _, f := range r.File {
			uniqueFilenameFromZip, path := getUniqueNameAndPathFromFile(fileFolder, f.Name)

			dst, err := os.Create(path)
			if err != nil {
				return err
			}
			defer dst.Close()

			// Copying the file.
			if _, err = io.Copy(dst, src); err != nil {
				return err
			}

			fileResponse, err := storeFileToDB(path, uniqueFilenameFromZip, db)

			if err != nil {
				return err
			}

			response.Files = append(response.Files, fileResponse)
		}
	} else {
		fileResponse, err := storeFileToDB(fileFolder, filename, db)

		if err != nil {
			return err
		}

		response.Files = append(response.Files, fileResponse)
	}

	return c.JSON(http.StatusCreated, response)
}

func storeFileToDB(path string, filename string, db *gorm.DB) (FileResponse, error) {
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

func storeFileToDisk(fileFolder string, filename string, src multipart.File) (string, string, error) {
	uniqueFilename, path := getUniqueNameAndPathFromFile(fileFolder, filename)

	dst, err := os.Create(path)
	if err != nil {
		return "", uniqueFilename, err
	}
	defer dst.Close()

	// Copying the file.
	if _, err = io.Copy(dst, src); err != nil {
		return "", uniqueFilename, err
	}
	return path, uniqueFilename, nil
}

func getUniqueNameAndPathFromFile(fileFolder string, filename string) (string, string) {
	uniqueFilename := CreateUniqueFileName(filename)
	path := fmt.Sprintf("%s/%s", fileFolder, uniqueFilename)
	return uniqueFilename, path
}
