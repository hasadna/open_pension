package mutation

import (
	"encoding/json"
	"fmt"
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

func processSheet(PayloadRecords []PayloadRecord) {
	for _, payloadRecord := range PayloadRecords {
		fmt.Println(payloadRecord)
	}
}


func MigrateProcessedObject(parsedPayload Payload) Result {
	processSheet(parsedPayload.Caches)
	processSheet(parsedPayload.GovernmentBond)
	processSheet(parsedPayload.CommercialDebt)
	processSheet(parsedPayload.CorporateBond)
	processSheet(parsedPayload.Stock)
	processSheet(parsedPayload.ETF)
	processSheet(parsedPayload.MutualFund)
	processSheet(parsedPayload.Warrant)
	processSheet(parsedPayload.Structured)
	processSheet(parsedPayload.NotTradedGovernmentBond)
	processSheet(parsedPayload.NotTradedCommercialDebt)
	processSheet(parsedPayload.NotTradedCorporateBond)
	processSheet(parsedPayload.NotTradedStock)
	processSheet(parsedPayload.NotTradedPrivateEquity)
	processSheet(parsedPayload.NotTradedWarrant)
	processSheet(parsedPayload.NotTradedOption)
	processSheet(parsedPayload.NotTradedFuture)
	processSheet(parsedPayload.NotTradedStructured)
	processSheet(parsedPayload.NotTradedLoans)
	processSheet(parsedPayload.Deposits)
	processSheet(parsedPayload.RealEstate)
	processSheet(parsedPayload.PortfolioCompanies)
	processSheet(parsedPayload.OtherInvestments)
	processSheet(parsedPayload.InvestmentCommitments)
	processSheet(parsedPayload.FairValue)
	processSheet(parsedPayload.NotTradedFairValue)
	processSheet(parsedPayload.CreditFairValue)

	result := Result{Data: "Passed", Error: ""}
	return result
}
