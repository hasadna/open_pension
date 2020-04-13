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

	// Create instrument data by company.
	instrumentData := Models.InstrumentDateByCompany{}
	instrumentData.Currency = payloadRecord.Currency
	//instrumentData.Duration = ''
	//instrumentData.Rate = ''
	//instrumentData.Price = ''
	//instrumentData.RateRegister = ''


	// Other properties which need special logic will be handled in other functions.
	AttachFairValue(payloadRecord, &instrumentData)
	AttachDates(payloadRecord, &instrumentData)

	// todo: Does fund, instrument and company are unique for each one? If so, is that mean the when crating an
	// 	instrument we need to attach the issuer reference (company) to the fund and the investing company?
	AttachInstrument(payloadRecord, db, &instrumentData)
	AttachFund(payloadRecord, db, &instrumentData)
	AttachLooseEnds(payloadRecord, db, &instrumentData)

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

func AttachInstrument(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	// todo: ask if an instrument can be shared among several records.
	instrument := Models.Instrument{}

	// todo: how to get the country?
	// todo: what to do when there's no market name? from where to get the market code?
	market := Models.Market{}
	db.FirstOrCreate(&market, Models.Market{MarketName: payloadRecord.MarketName})

	// Creating company.
	// todo: ask moshe - does the CompanyLocalNumber is the what exists in the table?
	issuer := Models.Company{}
	db.FirstOrCreate(&issuer, Models.Company{CompanyLocalNumber: payloadRecord.IssuerNumber})

	// Finally, create the instrument.
	db.FirstOrCreate(&instrument, Models.Instrument{
		InvestmentType: payloadRecord.Investment,
		InstrumentName: payloadRecord.InstrumentName,
		InstrumentNumber: payloadRecord.InstrumentNumber,
		IssuerNumberId: issuer.ID,
		Industry: payloadRecord.Industry,
		MarketId: market.ID,
	})

	instrument.IssuerNumber = issuer
	instrument.Market = market

	instrumentData.InstrumentNumberId = instrument.ID
	instrumentData.InstrumentNumber = instrument
}

func AttachFairValue(payloadRecord PayloadRecord, instrumentData *Models.InstrumentDateByCompany) {
	FairValue, err := strconv.ParseFloat(payloadRecord.FairValue, 10)

	if err != nil {
		panic(err)
	}

	instrumentData.FairValue = FairValue
}

func AttachLooseEnds(payloadRecord PayloadRecord, db *gorm.DB, instrumentData *Models.InstrumentDateByCompany) {
	// Connect all the entities we created during the parsing.
	instrumentData.InvestingCompanyId = instrumentData.InstrumentNumber.IssuerNumberId

	//fund := Models.Fund{}
	//
	//db.First(&fund, instrumentData.FundId)
	//fmt.Println(fund.ExecutiveBodyId, fund.ExecutiveBody)

	// Attach the fund to the executive body.
	db.Model(&Models.Fund{}).Where("id = ?", instrumentData.FundId).Updates(Models.Fund{ExecutiveBodyId:instrumentData.InvestingCompanyId})
}
