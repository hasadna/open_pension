package Models

import "github.com/jinzhu/gorm"

type Company struct {
	gorm.Model
	CompanyName        string
	CompanyLocalNumber string
	CompanyLei         string
	Country            uint
	Domain             string
	CompanyType        string
}

func (Company) TableName() string {
	return "company"
}
