package api

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/labstack/gommon/log"
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
			time.Sleep(time.Second)
			continue
		}

		db.Set("gorm.auto_preload", true).Set("gorm:table_options", "charset=utf8")
		db.AutoMigrate(File{})

		return db
	}

	// Did not managed to connect to the DB.
	panic("failed to connect database after 10 attempts.")
}

func (File) TableName() string {
	return "file"
}

func (file *File) AlterFileRecordAfterDownload(path string) {
	file.Path = path
	file.Downloaded = true
	file.Filename = GetFileNameFromPathOrUrl(path)
}

func SaveUrlToDb(url string) {
	db := GetDbConnection()

	var file File
	db.Where(&File{URL: url}).FirstOrCreate(&file)
	fmt.Println(file)
}

func GetUnDownloadedFiles(limit int) []File {
	db := GetDbConnection()
	query := db.Where(&File{Downloaded: false})

	if limit == 1 {
		var file File
		query.First(&file)
		return []File{file}
	}

	var files []File

	query.Limit(limit).Find(&files)

	return files
}
