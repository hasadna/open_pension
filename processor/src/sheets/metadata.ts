import agach from "./sheetsMapping/agach";
import noTradeAgach from "./sheetsMapping/noTradeAgach";
import options from "./sheetsMapping/options";
import noTradeOptions from "./sheetsMapping/noTradeOptions";
import loans from "./sheetsMapping/loans";
import portfolioComapnies from "./sheetsMapping/portfolioComapnies";
import otherInvestments from "./sheetsMapping/otherInvestments";
import realEstate from "./sheetsMapping/realEstate";
import futureContracts from "./sheetsMapping/futureContracts";
import noTraceFutureContracts from "./sheetsMapping/noTraceFutureContracts";
import InvestmentCommitments from "./sheetsMapping/InvestmentCommitments";
import warrent from "./sheetsMapping/warrent";
import noTradeWarrent from "./sheetsMapping/noTradeWarrent";
import products from "./sheetsMapping/products";
import noTradesProducts from "./sheetsMapping/noTradesProducts";
import stocks from "./sheetsMapping/stocks";
import noTradesStocks from "./sheetsMapping/noTradesStocks";
import deposites from "./sheetsMapping/deposites";
import privateEquity from "./sheetsMapping/privateEquity";
import mutualFunds from "./sheetsMapping/mutualFunds";
import governmentFunds from "./sheetsMapping/governmentFunds";
import noTradesGovernmentFunds from "./sheetsMapping/noTradesGovernmentFunds";
import commercialDebt from "./sheetsMapping/commercialDebt";
import noTradesCommercialDebt from "./sheetsMapping/noTradesCommercialDebt";
import ETF from "./sheetsMapping/ETF";
import noTradeFairValue from "./sheetsMapping/noTradeFairValue";
import fairValue from "./sheetsMapping/fairValue";
import cash from "./sheetsMapping/cash";
import creditLoans from "./sheetsMapping/creditLoans";

export const orderedSheets = [
    'סכום נכסי הקרן',
    'מזומנים',
    'תעודות התחייבות ממשלתיות',
    'תעודות חוב מסחריות',
    'אג"ח קונצרני',
    'מניות',
    'תעודות סל',
    'קרנות נאמנות',
    'כתבי אופציה',
    'אופציות',
    'חוזים עתידיים',
    'מוצרים מובנים',
    'לא סחיר - תעודות התחייבות ממשלתי',
    'לא סחיר - תעודות חוב מסחריות',
    'לא סחיר - אג"ח קונצרני',
    'לא סחיר - מניות',
    'לא סחיר - קרנות השקעה',
    'לא סחיר - כתבי אופציה',
    'לא סחיר - אופציות',
    'לא סחיר - חוזים עתידיים',
    'לא סחיר - מוצרים מובנים',
    'הלוואות',
    'פקדונות מעל 3 חודשים',
    'זכויות מקרקעין',
    'השקעה בחברות מוחזקות',
    'השקעות אחרות',
    'יתרת התחייבות להשקעה',
    'עלות מתואמת אג"ח קונצרני סחיר',
    'עלות מתואמת אג"ח קונצרני ל.סחיר',
    'עלות מתואמת מסגרות אשראי ללווים'
]

export const sheetsKeys: { [key: string]: object } = {
    'אג"ח קונצרני': agach,
    'לא סחיר - אג"ח קונצרני': noTradeAgach,
    'אופציות': options,
    'לא סחיר - אופציות': noTradeOptions,
    'הלוואות': loans,
    'השקעה בחברות מוחזקות': portfolioComapnies,
    'השקעות אחרות': otherInvestments,
    'זכויות מקרקעין': realEstate,
    'חוזים עתידיים': futureContracts,
    'לא סחיר - חוזים עתידיים': noTraceFutureContracts,
    'יתרת התחייבות להשקעה': InvestmentCommitments,
    'כתבי אופציה': warrent,
    'לא סחיר - כתבי אופציה': noTradeWarrent,
    'מוצרים מובנים': products,
    'לא סחיר - מוצרים מובנים': noTradesProducts,
    'מניות': stocks,
    'לא סחיר - מניות': noTradesStocks,
    'פקדונות מעל 3 חודשים': deposites,
    'לא סחיר - קרנות השקעה': privateEquity,
    'קרנות נאמנות': mutualFunds,
    'תעודות התחייבות ממשלתיות': governmentFunds,
    'לא סחיר - תעודות התחייבות ממשלתי': noTradesGovernmentFunds,
    'תעודות חוב מסחריות': commercialDebt,
    'לא סחיר - תעודות חוב מסחריות': noTradesCommercialDebt,
    'תעודות סל': ETF,
    'עלות מתואמת אג"ח קונצרני ל.סחיר': noTradeFairValue,
    'עלות מתואמת אג"ח קונצרני סחיר': fairValue,
    'מזומנים': cash,
    'עלות מתואמת מסגרות אשראי ללווים': creditLoans,
}

export const fieldsTranslation: {[key: string]: string} = {
    "אג\"ח קונצרני": "Corporate Bond",
    "אופציות": "Option",
    "ארץ": "Country",
    "אתר": "Web",
    "גוף מוסדי": "Institutional body",
    "דירוג": "Rating",
    "הלוואות": "Loans",
    "הצמדה": "Protected",
    "השקעה בחברות מוחזקות": "Investee Companies",
    "השקעות אחרות": "Other Investments",
    "זכויות מקרקעין": "Real Estate",
    "חברות": "Commercial Country",
    "חוזים עתידיים": "Future",
    "יעודיות": "Designated Bond",
    "כתבי אופציה": "Warrant",
    "כתובת הנכס": "Real Estate address",
    "מוצרים מובנים": "Structured",
    "מזומנים": "Cash",
    "מח\"מ": "Duration",
    "ממשלה": "Government Bond",
    "מניות": "Stock",
    "מספר מנפיק": "Issuer Nunber",
    "מספר ני\"ע": "Instrument Number",
    "מספר קרן": "Fund Number",
    "נדלן": "Real Estate Type",
    "נכס בסיס": "Underlying",
    "סוג הלוואה": "Loan Type",
    "סוג מוצר": "Structured Type",
    "סוג מטבע": "Currency",
    "סוג נגזר": "Derivative Type",
    "סוג קרן": "Investmnet Fund Type",
    "סחירות": "Tradable",
    "ענף פעילות": "Industry",
    "ערך נקוב": "Nominal Value",
    "פקדונות מעל 3 חודשים": "Deposits",
    "קונסורציום כן/לא": "Consortium",
    "קרנות השקעה": "Private Equity",
    "שווי הוגן": "Fair Value",
    "שווי שוק": "Market Value",
    "שייך למדד": "Index",
    "שיעור ריבית": "Rate",
    "שם המדרג": "Rating Agencies",
    "שם המנפיק/שם נייר ערך": "Instrument Name",
    "שם מנפיק": "Issuer Mane",
    "שם קרן": "Fund Nane",
    "שעור מנכסי אפיק ההשקעה": "Rate of Instrument Type",
    "שעור מסך נכסי השקעה": "Rafe of Funde Holding",
    "שעור מערך נקוב מונפק": "Rafe of Register",
    "שער": "Price",
    "תעודות השתתפות בקרנות נאמנות": "Mutual Fund",
    "תעודות התחייבות ממשלתיות": "Government Bond",
    "תעודות חוב מסחריות": "Commercial Debt",
    "תעודות סל": "ETF",
    "תשואה לפידיון": "yield",

    "תאריך הדיווח": "Date",
    "החברה המדווחת": "Institutional body",
    "שם מסלול/קרן/קופה": "Fund Name",
    "מספר מסלול/קרן/קופה": "Fund Number",
    "1.ד. הלוואות": "Loans",
    "1.ה. פקדונות מעל 3 חודשים": "Deposits",
    "1. ו. זכויות במקרקעין": "1. Real Estate",
    "1. ז. השקעה בחברות מוחזקות": "Portfolio Companies",
    "1. ט. יתרות התחייבות להשקעה": "Investment commitments",
    'שם נ"ע': "Instrument Name",
    "שם מדרג": "Rating Agencies",
    "שיעור מנכסי אפיק ה השקעה": "Rate of Instrument Type",
    "שעור מנכסי השקעה": "Rafe of Funde Holding",
    "עלות מתואמת מסגרות אשראי ללווים": "Fair Value",
    "שיעור מנכסי אפיק ההשקעה": "Rate of Instrument Type",
    "עלות מותאמת": "Fair Value",
    "ריבית אפקטיבית": "Effective Interests",
    "תאריך רכישה": "Purchase date",
    "ענף מסחר": "Industry",
    'עלות מתואמת אג"ח קונצרני ל.סחיר': "Fair Value",
    "מנכסי אפיק ההשקעה": "Rate of Instrument Type",
    'עלות מתואמת אג"ח קונצרני סחיר': "Fair Value",
    'תאריך סיום ההתחייבות': "Date of Investment commitments",
    'מנפיק': "Issuer Mane",
    'תאריך שערוך אחרון': "Date of valuation",
    'אופי הנכס': "Real Estate Type",
    'שיעור התשואה במהלך התקופה': "yield over period",
    'שווי משוערך': "Fair Value",
    'ספק מידע': "Information provider",
    'זירת מסחר': "Market name",
}
