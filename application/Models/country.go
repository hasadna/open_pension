package Models

import "time"

type Country struct {
	ID            uint       `gorm:"primary_key"`
	Name          string     `json:"name"`
	Iso2Code      string     `json:"iso2code"`
	Iso3Code      string     `json:"iso2code"`
	ContinentName string     `json:"continent_name"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
	DeletedAt     *time.Time `sql:"index" json:"deleted_at"`
}

func (Country) TableName() string {
	return "country"
}
