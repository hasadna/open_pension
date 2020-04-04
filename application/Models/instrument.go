package Models

type Instrument struct {
	ID   int64
}

func (Instrument) TableName() string {
	return "instrument"
}
