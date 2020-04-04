package Models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type InstrumentDateByCompany struct {
	gorm.Model
	InvestCompany          uint
	Currency               string
	Duration               float64
	FairValue              int64
	InstrumentNumber       uint
	FundId                 uint
	NominalValue           float64
	Price                  float64
	PurchaseDate           time.Time
	Rate                   float64
	RateFundHolding        float64
	RateFundInstrumentType float64
	RateRegister           float64
	ReportDate             time.Time
}

func (InstrumentDateByCompany) TableName() string {
	return "instrument_date_by_company"
}
