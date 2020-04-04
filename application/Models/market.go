package Models

type Market struct {
    ID   int64
}

func (Market) TableName() string {
    return "market"
}
