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
	ProcessSheet(parsedPayload.Caches, db)
	ProcessSheet(parsedPayload.GovernmentBond, db)
	ProcessSheet(parsedPayload.CommercialDebt, db)
	ProcessSheet(parsedPayload.CorporateBond, db)
	ProcessSheet(parsedPayload.Stock, db)
	ProcessSheet(parsedPayload.ETF, db)
	ProcessSheet(parsedPayload.MutualFund, db)
	ProcessSheet(parsedPayload.Warrant, db)
	ProcessSheet(parsedPayload.Structured, db)
	ProcessSheet(parsedPayload.NotTradedGovernmentBond, db)
	ProcessSheet(parsedPayload.NotTradedCommercialDebt, db)
	ProcessSheet(parsedPayload.NotTradedCorporateBond, db)
	ProcessSheet(parsedPayload.NotTradedStock, db)
	ProcessSheet(parsedPayload.NotTradedPrivateEquity, db)
	ProcessSheet(parsedPayload.NotTradedWarrant, db)
	ProcessSheet(parsedPayload.NotTradedOption, db)
	ProcessSheet(parsedPayload.NotTradedFuture, db)
	ProcessSheet(parsedPayload.NotTradedStructured, db)
	ProcessSheet(parsedPayload.NotTradedLoans, db)
	ProcessSheet(parsedPayload.Deposits, db)
	ProcessSheet(parsedPayload.RealEstate, db)
	ProcessSheet(parsedPayload.PortfolioCompanies, db)
	ProcessSheet(parsedPayload.OtherInvestments, db)
	ProcessSheet(parsedPayload.InvestmentCommitments, db)
	ProcessSheet(parsedPayload.FairValue, db)
	ProcessSheet(parsedPayload.NotTradedFairValue, db)
	ProcessSheet(parsedPayload.CreditFairValue, db)

	result := Result{Data: "Passed", Error: ""}
	return result
}

func ProcessSheet(PayloadRecords []PayloadRecord, db *gorm.DB) {
	for _, payloadRecord := range PayloadRecords {
		processRecord(payloadRecord, db)
	}
}

func processRecord(payloadRecord PayloadRecord, db *gorm.DB) {
	// Create instrument data by company.
	instrumentData := Models.InstrumentDateByCompany{
		Currency: payloadRecord.Currency,
		FairValue: ConvertStringToFloat(payloadRecord.FairValue),
		Duration: ConvertStringToFloat(payloadRecord.Duration),
		Rate: ConvertStringToFloat(payloadRecord.Rate),
		Price: ConvertStringToFloat(payloadRecord.Price),
		RateRegister: ConvertStringToFloat(payloadRecord.RateOfRegister),
		RateFundHolding: ConvertStringToFloat(payloadRecord.RateOfFundHolding),
		RateFundInstrumentType: ConvertStringToFloat(payloadRecord.RateOfInstrumentType),
	}

	AttachDates(payloadRecord, &instrumentData)
	AttachInstrument(payloadRecord, db, &instrumentData)
	AttachFund(payloadRecord, db, &instrumentData)

	instrumentData.InvestingCompanyId = instrumentData.InstrumentNumber.IssuerNumberId

	db.Save(&instrumentData)
}

// Get or create a fund for a given entry record.
func AttachDates(payloadRecord PayloadRecord, instrumentData *Models.InstrumentDateByCompany) {

	if payloadRecord.PurchaseDate != "" {
		parsedDate, _ := time.Parse("2006-01-02 00:00:00", payloadRecord.PurchaseDate)
		instrumentData.PurchaseDate = parsedDate
	}

	parsedDate, _ := time.Parse("02/01/2006", payloadRecord.Date)
	instrumentData.ReportDate = parsedDate
}

// Create the fund from the metadata on the file.
func AttachFund(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	company := Models.Company{}
	db.FirstOrCreate(&company, Models.Company{CompanyName: payloadRecord.InstitutionalBody})

	fund := Models.Fund{}
	db.FirstOrCreate(&fund, Models.Fund{FundName: payloadRecord.FundName, FundNumber: payloadRecord.FundNumber, ExecutiveBodyId: company.ID})
	instrumentData.FundId = fund.ID
}

func AttachInstrument(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	instrument := Models.Instrument{}

	market := Models.Market{}
	db.FirstOrCreate(&market, Models.Market{MarketName: payloadRecord.MarketName})

	// Creating company.
	issuer := Models.Company{}
	db.FirstOrCreate(&issuer, Models.Company{CompanyLocalNumber: payloadRecord.IssuerNumber})

	// Finally, create the instrument.
	db.FirstOrCreate(&instrument, Models.Instrument{
		InvestmentType:   payloadRecord.Investment,
		InstrumentName:   payloadRecord.InstrumentName,
		InstrumentNumber: payloadRecord.InstrumentNumber,
		IssuerNumberId:   issuer.ID,
		Industry:         payloadRecord.Industry,
		MarketId:         market.ID,
	})

	// Reference the instrument to the object we created so we can use it later on.
	instrument.IssuerNumber = issuer
	instrument.Market = market

	// Add the ID of the instrument on the instrument data along side the instrument object (for later reference).
	instrumentData.InstrumentNumberId = instrument.ID
	instrumentData.InstrumentNumber = instrument
}

func ConvertStringToFloat(originalString string) float64 {

	if originalString == "" {
		return 0
	}

	FairValue, err := strconv.ParseFloat(originalString, 10)

	if err != nil {
		panic(err)
	}

	return FairValue
}
