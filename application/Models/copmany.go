package Models

import (
	"time"
)

type Company struct {
	ID                 uint       `gorm:"primary_key" json:"id"`
	CompanyName        string     `json:"name"`
	CompanyLocalNumber string     `json:"company_local_number"`
	CompanyLei         string     `json:"company_lei"`
	Country            Country   `json:"Country" gorm:"foreignkey:CountryId"`
	CountryId          uint
	Domain             string     `json:"domain"`
	CompanyType        string     `json:"company_type"`
	CreatedAt          time.Time  `json:"created_at"`
	UpdatedAt          time.Time  `json:"updated_at"`
	DeletedAt          *time.Time `sql:"index" json:"deleted_at"`
}

func (Company) TableName() string {
	return "company"
}

//func (c *Company) AfterFind() (err error) {
//	db := api.GetDbConnection()
//
//	var country Country
//	db.Find(&country, 1)
//
//	c.Country = country
//
//	return nil
//}
