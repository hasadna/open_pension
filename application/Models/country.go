package Models

type Country struct {
    ID   int64
}

func (Country) TableName() string {
    return "country"
}
