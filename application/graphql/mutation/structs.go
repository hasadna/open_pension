package mutation

type Payload struct {
	Caches                  []PayloadRecord `json:"מזומנים"`
	GovernmentBond          []PayloadRecord `json:"תעודות התחייבות ממשלתיות"`
	CommercialDebt          []PayloadRecord `json:"תעודות חוב מסחריות"`
	CorporateBond           []PayloadRecord `json:"אג\"ח קונצרני"`
	Stock                   []PayloadRecord `json:"מניות"`
	ETF                     []PayloadRecord `json:"תעודות סל"`
	MutualFund              []PayloadRecord `json:"קרנות נאמנות"`
	Warrant                 []PayloadRecord `json:"כתבי אופציה"`
	Structured              []PayloadRecord `json:"מוצרים מובנים"`
	NotTradedGovernmentBond []PayloadRecord `json:"לא סחיר - תעודות התחייבות ממשלתי"`
	NotTradedCommercialDebt []PayloadRecord `json:"לא סחיר - תעודות חוב מסחריות"`
	NotTradedCorporateBond  []PayloadRecord `json:"לא סחיר - אג\"ח קונצרני"`
	NotTradedStock          []PayloadRecord `json:"לא סחיר - מניות"`
	NotTradedPrivateEquity  []PayloadRecord `json:"לא סחיר - קרנות השקעה"`
	NotTradedWarrant        []PayloadRecord `json:"לא סחיר - כתבי אופציה"`
	NotTradedOption         []PayloadRecord `json:"לא סחיר - אופציות"`
	NotTradedFuture         []PayloadRecord `json:"לא סחיר - חוזים עתידיים"`
	NotTradedStructured     []PayloadRecord `json:"לא סחיר - מוצרים מובנים"`
	NotTradedLoans          []PayloadRecord `json:"הלוואות"`
	Deposits                []PayloadRecord `json:"פקדונות מעל 3 חודשים"`
	RealEstate              []PayloadRecord `json:"זכויות מקרקעין"`
	PortfolioCompanies      []PayloadRecord `json:"השקעה בחברות מוחזקות"`
	OtherInvestments        []PayloadRecord `json:"השקעות אחרות"`
	InvestmentCommitments   []PayloadRecord `json:"יתרת התחייבות להשקעה"`
	FairValue               []PayloadRecord `json:"עלות מתואמת אג\"ח קונצרני סחיר"`
	NotTradedFairValue      []PayloadRecord `json:"עלות מתואמת אג\"ח קונצרני ל.סחיר"`
	CreditFairValue         []PayloadRecord `json:"עלות מתואמת מסגרות אשראי ללווים"`
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

	Date              string `json:"Date"`
	InstitutionalBody string `json:"Institutional body"`
	FundName          string `json:"Fund Name"`
	FundNumber        string `json:"Fund Number"`
}

type Result struct {
	Data  string `json:"data"`
	Error string `json:"error"`
}
