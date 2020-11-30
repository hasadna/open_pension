package Models

import "time"

type Instrument struct {
	ID               uint    `gorm:"primary_key" json:"id"`
	Industry         string  `json:"industry"`
	InstrumentName   string  `json:"instrument_name"`
	InvestmentType   string  `json:"investment_type"`
	InstrumentNumber string  `json:"instrument_number"`
	IssuerNumber     Company `json:"issuer_number" gorm:"foreignkey:IssuerNumberId"`
	IssuerNumberId   uint `sql:"DEFAULT:NULL"`
	Market           Market `json:"Market" gorm:"foreignkey:MarketId"`
	MarketId         uint `sql:"DEFAULT:NULL"`
	CreatedAt        time.Time  `json:"created_at"`
	UpdatedAt        time.Time  `json:"updated_at"`
	DeletedAt        *time.Time `sql:"index" json:"deleted_at"`
}

func (Instrument) TableName() string {
	return "instrument"
}
