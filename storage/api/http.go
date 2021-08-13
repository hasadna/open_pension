package api

import (
	"archive/zip"
	"github.com/labstack/echo/v4"
	"io"
	"net/http"
	"os"
	"strings"
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

		// Deleting the file. For now, we don't care for the error.
		_ = os.Remove(path)
	} else {
		fileResponse, err := storeFileToDB(fileFolder, filename, db)

		if err != nil {
			return err
		}

		response.Files = append(response.Files, fileResponse)
	}

	return c.JSON(http.StatusCreated, response)
}
