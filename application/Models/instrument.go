package Models

import "github.com/jinzhu/gorm"

type Instrument struct {
	gorm.Model
	Industry string
	InstrumentName string
	InstrumentType string
	InstrumentNumber string
	IssuerNumber uint
	Market uint
}

func (Instrument) TableName() string {
	return "instrument"
}
