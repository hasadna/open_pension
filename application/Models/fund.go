package Models

import "github.com/jinzhu/gorm"

type Fund struct {
	gorm.Model
	FundName        string
	FundNumber      int64
	ExecutiveBodyId uint
	IsActive        bool
}

func (Fund) TableName() string {
	return "fund"
}
