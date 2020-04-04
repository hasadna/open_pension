package Models

import "github.com/jinzhu/gorm"

type Market struct {
    gorm.Model
    MarketName string
    MarketCode string
    Country uint
}

func (Market) TableName() string {
    return "market"
}
