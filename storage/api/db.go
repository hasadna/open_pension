package api

import (
	"errors"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"storage/log"
	"time"
)

type File struct {
	ID         uint       `gorm:"primary_key"`
	Filename   string     `json:"filename"`
	Path       string     `json:"path"`
	Downloaded bool       `json:"downloaded"`
	URL        string     `json:"url"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
	DeletedAt  *time.Time `sql:"index" json:"deleted_at"`
}

func GetDbConnection() *gorm.DB {

	for i := 1; i <= 10; i++ {
		connectionString := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local&charset=utf8&collation=utf8_unicode_ci",
			GetEnv("MYSQL_USER"),
			GetEnv("MYSQL_PASSWORD"),
			GetEnv("MYSQL_HOST"),
			GetEnv("MYSQL_DATABASE"))

		db, err := gorm.Open("mysql", connectionString)

		if err != nil {
			log.Info(fmt.Sprintf("Failed to connect to the for in iteration No. %d. The reason: %s", i, err.Error()))
			time.Sleep(time.Second * 5)
			continue
		}

		db.Set("gorm.auto_preload", true).Set("gorm:table_options", "charset=utf8")
		db.AutoMigrate(File{})

		return db
	}

	// Did not maneged to connect to the DB.
	errorMessage := "failed to connect database after 10 attempts"
	log.Error(errors.New(errorMessage))
	panic(errorMessage)
}

func (File) TableName() string {
	return "file"
}

func (file *File) AlterFileRecordAfterDownload(path string) {
	file.Path = path
	file.Downloaded = true
	file.Filename = GetFileNameFromPathOrUrl(path)
}

func SaveUrlToDb(url string, db *gorm.DB) File {
	var file File

	log.Warning(fmt.Sprintf("Saving the file from %s to the DB", url))
	db.Where(&File{URL: url}).FirstOrCreate(&file)
	log.Info(fmt.Sprintf("The file from the url %s saved to the DB", url))

	return file
}

func GetUnDownloadedFiles(limit int, db *gorm.DB) []File {
	var files []File

	db.Where("downloaded = ?", false).Limit(limit).Find(&files)

	return files
}
