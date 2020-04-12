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

	//{
	//	"Purchase date": "Instruments_Data_By_Company.purchase_date",
	//	"Duration": "Instruments_Data_By_Company.duration",
	//	"Currency": "Instruments_Data_By_Company.currency",
	//	"Rate": "Instruments_Data_By_Company.rate",
	//	"Price": "Instruments_Data_By_Company.price",
	//	"Fair value": "Instruments_Data_By_Company.fair_value",
	//	"Rate of register": "Instruments_Data_By_Company.rate_register",
	//	"Rate of instrument type": "Instruments_Data_By_Company.instrument_type",
	//	"Rate of fund holding": "Instruments_Data_By_Company.rate_fund_holding",
	//	"Date": "Instruments_Data_By_Company.report_date",


	//	"Investment": "Instrument.investment_type",
	//	"Instrument name": "Instruments.instrument_name",
	//	"Instrument Number": "Instruments.instrument_number",
	//	"Issuer number": "Instruments.issuer_number",
	//	"Industry": "Instruments.industry",
	//
	//	"Market name": "Markets.market_code",

	//	"Institutional body": "Funds.fund_name",
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

	if payloadRecord.PurchaseDate == "" {
		// Maybe take the date?
		parsedDate, _ := time.Parse("02/01/2006", payloadRecord.Date)
		instrumentData.PurchaseDate = parsedDate
		instrumentData.ReportDate = parsedDate
	}

	instrumentData.Currency = payloadRecord.Currency
	FairValue, err := strconv.ParseFloat(payloadRecord.FairValue, 10)

	if err != nil {
		panic(err)
	}

	instrumentData.FairValue = FairValue

	db.Save(&instrumentData)


	// todo:
	// 	1. Get the missing fields value: PurchaseDate, duration, rate, price, rate of register
	//  2. Fix the processor and get the RateOfInstrumentType and RateOfFundHolding properly
	//  3. Create fund
	//  4. Create Markets
	//  5. Create Instrument
	//	6. Add the filename, sheet and line in file to the DB
}
