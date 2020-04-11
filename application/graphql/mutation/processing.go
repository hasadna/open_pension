package mutation

import (
	"encoding/json"
	"fmt"
	"github.com/hasadna/open_pension/application/graphql"
)

type Payload struct {
	Caches []PayloadRecord `json:"מזומנים"`
	Field02 []PayloadRecord `json:"תעודות התחייבות ממשלתיות"`
	Field03 []PayloadRecord `json:"תעודות חוב מסחריות"`
	Field04 []PayloadRecord `json:"אג\"ח קונצרני"`
	Field05 []PayloadRecord `json:"מניות"`
	Field06 []PayloadRecord `json:"תעודות סל"`
	Field07 []PayloadRecord `json:"קרנות נאמנות"`
	Field08 []PayloadRecord `json:"כתבי אופציה"`
	Field09 []PayloadRecord `json:"מוצרים מובנים"`
	Field10 []PayloadRecord `json:"לא סחיר - תעודות התחייבות ממשלתי"`
	Field11 []PayloadRecord `json:"לא סחיר - תעודות חוב מסחריות"`
	Field12 []PayloadRecord `json:"לא סחיר - אג\"ח קונצרני"`
	Field13 []PayloadRecord `json:"לא סחיר - מניות"`
	Field14 []PayloadRecord `json:"לא סחיר - קרנות השקעה"`
	Field15 []PayloadRecord `json:"לא סחיר - כתבי אופציה"`
	Field16 []PayloadRecord `json:"לא סחיר - אופציות"`
	Field17 []PayloadRecord `json:"לא סחיר - חוזים עתידיים"`
	Field18 []PayloadRecord `json:"לא סחיר - מוצרים מובנים"`
	Field19 []PayloadRecord `json:"הלוואות"`
	Field20 []PayloadRecord `json:"פקדונות מעל 3 חודשים"`
	Field21 []PayloadRecord `json:"זכויות מקרקעין"`
	Field22 []PayloadRecord `json:"השקעה בחברות מוחזקות"`
	Field23 []PayloadRecord `json:"השקעות אחרות"`
	Field24 []PayloadRecord `json:"יתרת התחייבות להשקעה"`
	Field25 []PayloadRecord `json:"עלות מתואמת אג\"ח קונצרני סחיר"`
	Field26 []PayloadRecord `json:"עלות מתואמת אג\"ח קונצרני ל.סחיר"`
	Field27 []PayloadRecord `json:"עלות מתואמת מסגרות אשראי ללווים"`
}

type PayloadRecord struct {
	Index                string `json:"index"`
	Israel               bool   `json:"israel"`
	InstrumentName       string `json:"Instrument name"`
	InstrumentNumber     string `json:"Instrument number"`
	IssuerNumber         string `json:"Issuer number"`
	RatingAgencies       string `json:"Rating agencies"`
	Currency             string `json:"Currency"`
	Rate                 string `json:"Rate"`
	YieldToMaturity      string `json:"Yield to maturity"`
	FairValue            string `json:"Fair value"`
	RateOfInstrumentType string `json:"Rate of instrument type"`
	Investment           string `json:"Investment"`
}

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

func MigrateProcessedObject(parsedPayload Payload) graphql.Result {

	fmt.Println(parsedPayload)

	result := graphql.Result{Data: "Passed", Error: ""}
	return result
}
