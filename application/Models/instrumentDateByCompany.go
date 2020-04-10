package Models

import (
	"time"
)

type InstrumentDateByCompany struct {
	ID                     uint    `gorm:"primary_key" json:"id"`
	InvestingCompany       Company `json:"invest_company" gorm:"foreignkey:InvestingCompanyId"`
	InvestingCompanyId     uint
	Currency               string     `json:"currency"`
	Duration               float64    `json:"duration"`
	FairValue              int64      `json:"fair_value"`
	InstrumentNumber       Instrument `json:"instrument_number" gorm:"foreignkey:InstrumentNumberId"`
	InstrumentNumberId     uint
	Fund                   Fund       `json:"fund_id" gorm:"foreignkey:FundId"`
	FundId                 uint
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
