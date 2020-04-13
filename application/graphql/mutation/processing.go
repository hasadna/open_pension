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
	//processSheet(parsedPayload.GovernmentBond, db)
	//processSheet(parsedPayload.CommercialDebt, db)
	//processSheet(parsedPayload.CorporateBond, db)
	//processSheet(parsedPayload.Stock, db)
	//processSheet(parsedPayload.ETF, db)
	//processSheet(parsedPayload.MutualFund, db)
	//processSheet(parsedPayload.Warrant, db)
	//processSheet(parsedPayload.Structured, db)
	//processSheet(parsedPayload.NotTradedGovernmentBond, db)
	//processSheet(parsedPayload.NotTradedCommercialDebt, db)
	//processSheet(parsedPayload.NotTradedCorporateBond, db)
	//processSheet(parsedPayload.NotTradedStock, db)
	//processSheet(parsedPayload.NotTradedPrivateEquity, db)
	//processSheet(parsedPayload.NotTradedWarrant, db)
	//processSheet(parsedPayload.NotTradedOption, db)
	//processSheet(parsedPayload.NotTradedFuture, db)
	//processSheet(parsedPayload.NotTradedStructured, db)
	//processSheet(parsedPayload.NotTradedLoans, db)
	//processSheet(parsedPayload.Deposits, db)
	//processSheet(parsedPayload.RealEstate, db)
	//processSheet(parsedPayload.PortfolioCompanies, db)
	//processSheet(parsedPayload.OtherInvestments, db)
	//processSheet(parsedPayload.InvestmentCommitments, db)
	//processSheet(parsedPayload.FairValue, db)
	//processSheet(parsedPayload.NotTradedFairValue, db)
	//processSheet(parsedPayload.CreditFairValue, db)

	result := Result{Data: "Passed", Error: ""}
	return result
}

func processSheet(PayloadRecords []PayloadRecord, db *gorm.DB) {
	for _, payloadRecord := range PayloadRecords {
		processRecord(payloadRecord, db)
	}
}

func processRecord(payloadRecord PayloadRecord, db *gorm.DB) {
	// Create instrument data by company.
	instrumentData := Models.InstrumentDateByCompany{}
	instrumentData.Currency = payloadRecord.Currency

	//// מח״מ
	//instrumentData.Duration = payloadRecord.Duration
	//
	//// ?
	//instrumentData.Rate = payloadRecord.Rate
	//
	//// ?
	//instrumentData.Price = payloadRecord.Price
	//
	//// ?
	//instrumentData.RateRegister = payloadRecord.RateOfRegister

	// Other properties which need special logic will be handled in other functions.
	AttachFairValue(payloadRecord, &instrumentData)
	AttachDates(payloadRecord, &instrumentData)

	AttachInstrument(payloadRecord, db, &instrumentData)
	AttachFund(payloadRecord, db, &instrumentData)

	instrumentData.InvestingCompanyId = instrumentData.InstrumentNumber.IssuerNumberId

	db.Save(&instrumentData)
}

// Get or create a fund for a given entry record.
func AttachDates(payloadRecord PayloadRecord, instrumentData *Models.InstrumentDateByCompany) {

	if payloadRecord.PurchaseDate != "" {
		return
	}

	// Maybe take the date?
	parsedDate, _ := time.Parse("02/01/2006", payloadRecord.Date)

	// Not always exists.
	instrumentData.PurchaseDate = parsedDate

	// Take from the header of the file.
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

func AttachFairValue(payloadRecord PayloadRecord, instrumentData *Models.InstrumentDateByCompany) {

	if payloadRecord.FairValue == "" {
		instrumentData.FairValue = 0
		return
	}

	FairValue, err := strconv.ParseFloat(payloadRecord.FairValue, 10)

	if err != nil {
		//matched, err := regexp.Match(`foo.*`, []byte(`seafood`))
		panic(err)
	}

	instrumentData.FairValue = FairValue
}
