package Models

type Fund struct {
    ID   int64
}

func (Fund) TableName() string {
    return "fund"
}
