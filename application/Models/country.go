package Models

import "github.com/jinzhu/gorm"

type Country struct {
	gorm.Model
	Name        string
	Iso2Code    string
	Iso3Code    string
	ContinentName string
}

func (Country) TableName() string {
	return "country"
}
