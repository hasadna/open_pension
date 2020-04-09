package Models

import "time"

type Fund struct {
	ID              uint       `gorm:"primary_key" json:"id"`
	FundName        string     `json:"fund_name"`
	FundNumber      int64      `json:"fund_number"`
	ExecutiveBody   Company 	 `json:"executive_body" gorm:"foreignkey:ExecutiveBodyId"`
	ExecutiveBodyId uint
	IsActive        bool       `json:"is_active"`
	CreatedAt       time.Time  `gorm:"primary_key" json:"created_at"`
	UpdatedAt       time.Time  `gorm:"primary_key" json:"updated_at"`
	DeletedAt       *time.Time `sql:"index" json:"deleted_at"`
}

func (Fund) TableName() string {
	return "fund"
}
