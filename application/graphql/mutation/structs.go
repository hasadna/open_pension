package mutation

type Payload struct {
	Caches  []PayloadRecord `json:"מזומנים"`
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
	Consortium                  string `json:"Consortium"`
	Coupon                      string `json:"coupon"`
	Currency                    string `json:"Currency"`
	DateOfInvestmentCommitments string `json:"Date of investment commitments"`
	DateOfValuation             string `json:"Date of valuation"`
	Dividend                    string `json:"dividend"`
	Duration                    string `json:"Duration"`
	EffectiveInterest           string `json:"Effective interest"`
	FairValue                   string `json:"Fair value"`
	HoldingPeriodReturnYield    string `json:"Holding period return/yield"`
	Index                       string `json:"index"`
	Industry                    string `json:"Industry"`
	InformationProvider         string `json:"Information provider"`
	InstrumentName              string `json:"Instrument name"`
	InstrumentNumber            string `json:"Instrument number"`
	Investment                  string `json:"Investment"`
	Israel                      bool   `json:"israel"`
	IssuerNumber                string `json:"Issuer number"`
	MarketName                  string `json:"Market name"`
	NominalValue                string `json:"Nominal value"`
	Price                       string `json:"Price"`
	PurchaseDate                string `json:"Purchase date"`
	Rate                        string `json:"Rate"`
	RateOfFundHolding           string `json:"Rate of fund holding"`
	RateOfInstrumentType        string `json:"Rate of instrument type"`
	RateOfRegister              string `json:"Rate of register"`
	Rating                      string `json:"Rating"`
	RatingAgencies              string `json:"Rating agencies"`
	RealEstateAddress           string `json:"Real estate address"`
	RealEstateType              string `json:"Real estate type"`
	TotalCommitment             string `json:"total commitment"`
	UnderlyingAsset             string `json:"Underlying asset"`
	YieldToMaturity             string `json:"Yield to maturity"`
}

type Result struct {
	Data  string `json:"data"`
	Error string `json:"error"`
}
