package Models

import (
	"time"
)

type InstrumentDateByCompany struct {
	ID                     uint       `gorm:"primary_key" json:"id"`
	InvestCompany          uint       `json:"invest_company"`
	Currency               string     `json:"currency"`
	Duration               float64    `json:"duration"`
	FairValue              int64      `json:"fair_value"`
	InstrumentNumber       uint       `json:"instrument_number"`
	FundId                 uint       `json:"fund_id"`
	NominalValue           float64    `json:"nominal_value"`
	Price                  float64    `json:"price"`
	PurchaseDate           time.Time  `json:"purchase_date"`
	Rate                   float64    `json:"rate"`
	RateFundHolding        float64    `json:"fund_rate_holding"`
	RateFundInstrumentType float64    `json:"rate_funding_instrument_type"`
	RateRegister           float64    `json:"rate_register"`
	ReportDate             time.Time  `json:"report_date"`
	CreatedAt              time.Time  `json:"created_at"`
	UpdatedAt              time.Time  `json:"updated_at"`
	DeletedAt              *time.Time `sql:"index" json:"deleted_at"`
}

func (InstrumentDateByCompany) TableName() string {
	return "instrument_date_by_company"
}
