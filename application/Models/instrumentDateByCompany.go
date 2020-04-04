package Models

type InstrumentDateByCompany struct {
    ID   int64
}

func (InstrumentDateByCompany) TableName() string {
    return "instrument_date_by_company"
}
