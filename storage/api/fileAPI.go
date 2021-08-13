package api

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"io"
	"mime/multipart"
	"os"
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
	//SendMessage(dbFile)

	resp := FileResponse{ID: dbFile.ID, Filename: dbFile.Filename}

	return resp, nil
}


