package mutation

import (
	"encoding/json"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
	"strconv"
	"time"
)

// Handle the json string processing to an object.
func JsonStringParse(JsonString string) (Payload, error) {
	var parsedPayload Payload

	err := json.Unmarshal([]byte(JsonString), &parsedPayload)

	if err != nil {
		// Found an error during parsing.
		return parsedPayload, err
	}

	return parsedPayload, nil
}

func MigrateProcessedObject(parsedPayload Payload, db *gorm.DB) Result {
	processSheet(parsedPayload.Caches, db)
	//processSheet(parsedPayload.GovernmentBond)
	//processSheet(parsedPayload.CommercialDebt)
	//processSheet(parsedPayload.CorporateBond)
	//processSheet(parsedPayload.Stock)
	//processSheet(parsedPayload.ETF)
	//processSheet(parsedPayload.MutualFund)
	//processSheet(parsedPayload.Warrant)
	//processSheet(parsedPayload.Structured)
	//processSheet(parsedPayload.NotTradedGovernmentBond)
	//processSheet(parsedPayload.NotTradedCommercialDebt)
	//processSheet(parsedPayload.NotTradedCorporateBond)
	//processSheet(parsedPayload.NotTradedStock)
	//processSheet(parsedPayload.NotTradedPrivateEquity)
	//processSheet(parsedPayload.NotTradedWarrant)
	//processSheet(parsedPayload.NotTradedOption)
	//processSheet(parsedPayload.NotTradedFuture)
	//processSheet(parsedPayload.NotTradedStructured)
	//processSheet(parsedPayload.NotTradedLoans)
	//processSheet(parsedPayload.Deposits)
	//processSheet(parsedPayload.RealEstate)
	//processSheet(parsedPayload.PortfolioCompanies)
	//processSheet(parsedPayload.OtherInvestments)
	//processSheet(parsedPayload.InvestmentCommitments)
	//processSheet(parsedPayload.FairValue)
	//processSheet(parsedPayload.NotTradedFairValue)
	//processSheet(parsedPayload.CreditFairValue)

	result := Result{Data: "Passed", Error: ""}
	return result
}

func processSheet(PayloadRecords []PayloadRecord, db *gorm.DB) {
	for _, payloadRecord := range PayloadRecords {
		processRecord(payloadRecord, db)
	}
}

func processRecord(payloadRecord PayloadRecord, db *gorm.DB) {

	// todo:
	//  4. Create Markets
	//  5. Create Instrument
	// 	6. Add the filename, sheet and line in file to the DB

	//{

	//	"Investment": "Instrument.investment_type",
	//	"Instrument name": "Instruments.instrument_name",
	//	"Instrument Number": "Instruments.instrument_number",
	//	"Issuer number": "Instruments.issuer_number",
	//	"Industry": "Instruments.industry",
	//
	//	"Market name": "Markets.market_code",

	//
	//	"Information provider": "",
	//	"Rating": "",
	//	"Rating agencies": "",
	//	"Yield to maturity": "",
	//	"Nominal value": "",
	//	"Coupon": "",
	//	"file_name": "",
	//	"index": "",
	//	"israel": "",
	//	"line_in_file": ""
	//}

	// Create instrument data by company.
	instrumentData := Models.InstrumentDateByCompany{}
	instrumentData.Currency = payloadRecord.Currency
	//instrumentData.PurchaseDate = FairValue
	//instrumentData.Duration = ''
	//instrumentData.Rate = ''
	//instrumentData.Price = ''
	//instrumentData.RateRegister = ''


	// Other properties which need special logic will be handled in other functions.
	AttachFairValue(payloadRecord, &instrumentData)
	AttachDates(payloadRecord, &instrumentData)
	AttachFund(payloadRecord, db, &instrumentData)
	AttachMarket(payloadRecord, db, &instrumentData)
	AttachInstrument(payloadRecord, db, &instrumentData)

	db.Save(&instrumentData)
}

// Get or create a fund for a given entry record.
func AttachDates(payloadRecord PayloadRecord, instrumentData *Models.InstrumentDateByCompany) {

	if payloadRecord.PurchaseDate != "" {
		return
	}

	// Maybe take the date?
	parsedDate, _ := time.Parse("02/01/2006", payloadRecord.Date)
	instrumentData.PurchaseDate = parsedDate
	instrumentData.ReportDate = parsedDate
}

func AttachFund(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	fund := Models.Fund{}
	db.FirstOrCreate(&fund, Models.Fund{FundName: payloadRecord.FundName, FundNumber: payloadRecord.FundNumber})
	instrumentData.FundId = fund.ID
}

func AttachMarket(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	//market := Models.Market{}
}

func AttachInstrument(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	//instrument := Models.Instrument{}
}

func AttachFairValue(payloadRecord PayloadRecord, instrumentData *Models.InstrumentDateByCompany) {
	FairValue, err := strconv.ParseFloat(payloadRecord.FairValue, 10)

	if err != nil {
		panic(err)
	}

	instrumentData.FairValue = FairValue
}
