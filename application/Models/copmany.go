package Models

type Company struct {
	ID   int64
}

func (Company) TableName() string {
	return "company"
}
