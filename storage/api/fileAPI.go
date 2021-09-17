package api

import (
	"archive/zip"
	"fmt"
	"github.com/jinzhu/gorm"
	"io"
	"mime/multipart"
	"os"
	"storage/log"
	"strings"
)

type FileResponse struct {
	ID       uint   `json:"ID"`
	Filename string `json:"filename"`
}

type FilesResponse struct {
	Files []FileResponse `json:"files"`
}

func getUniqueNameAndPathFromFile(fileFolder string, filename string) (string, string) {
	uniqueFilename := CreateUniqueFileName(filename)
	path := fmt.Sprintf("%s/%s", fileFolder, uniqueFilename)
	return uniqueFilename, path
}

func storeFile(filename string, path string, fileFolder string, src multipart.File, db *gorm.DB, response *FilesResponse) error {
	if strings.HasSuffix(filename, ".zip") {
		log.Info(fmt.Sprintf("Handeling a ZIP file %s", filename))
		err := handleZipFile(path, fileFolder, src, db, response)
		if err != nil {
			return err
		}
	} else {
		log.Info(fmt.Sprintf("Handeling a simple file %s", filename))
		fileResponse, err := storeFileToDB(path, filename, db)

		if err != nil {
			return err
		}

		response.Files = append(response.Files, fileResponse)
	}
	return nil
}

func handleZipFile(path string, fileFolder string, src multipart.File, db *gorm.DB, response *FilesResponse) error {
	r, err := zip.OpenReader(path)

	if err != nil {
		return err
	}

	defer r.Close()

	for _, f := range r.File {
		fileResponse, err := extractFileFromZip(fileFolder, f, src, db)
		if err != nil {
			log.Error(err)
			return err
		}

		response.Files = append(response.Files, fileResponse)
	}

	// Deleting the file. For now, we don't care for the error.
	_ = os.Remove(path)
	log.Info(fmt.Sprintf("Removing the zip file %s", path))
	return nil
}

func extractFileFromZip(fileFolder string, f *zip.File, src multipart.File, db *gorm.DB) (FileResponse, error) {
	uniqueFilenameFromZip, path := getUniqueNameAndPathFromFile(fileFolder, f.Name)

	// Create the path fo the file.
	dst, err := os.Create(path)
	if err != nil {
		return FileResponse{}, err
	}
	defer dst.Close()

	// Reading the file from the zip file.
	fileFromZip, err := f.Open()

	if err != nil {
		return FileResponse{}, err
	}

	// Copying the file we opened to the destination we read.
	if _, err = io.Copy(dst, fileFromZip); err != nil {
		return FileResponse{}, err
	}

	fileResponse, err := storeFileToDB(path, uniqueFilenameFromZip, db)

	if err != nil {
		return FileResponse{}, err
	}
	return fileResponse, nil
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

func storeFileToDB(path string, filename string, db *gorm.DB) (FileResponse, error) {
	// Create a record in the DB as downloaded and send the kafka event.
	var dbFile File
	db.Where(&File{
		Filename:   filename,
		Path:       path,
		Downloaded: true,
	}).FirstOrCreate(&dbFile)

	// Sending a kafka event.
	SendMessage(dbFile)

	resp := FileResponse{ID: dbFile.ID, Filename: dbFile.Filename}

	return resp, nil
}
