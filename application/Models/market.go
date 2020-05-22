package Models

import "time"

type Market struct {
	ID         uint       `gorm:"primary_key" json:"id"`
	MarketName string     `json:"market_name"`
	MarketCode string     `json:"market_code"`
	Country    Country    `json:"country" gorm:"foreignkey:CountryId"`
	CountryId  uint				`sql:"DEFAULT:NULL"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
	DeletedAt  *time.Time `sql:"index" json:"deleted_at"`
}

func (Market) TableName() string {
	return "market"
}
