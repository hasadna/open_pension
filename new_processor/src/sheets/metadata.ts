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

export const sheetsKeys = {
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
