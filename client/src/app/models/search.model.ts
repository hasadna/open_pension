export interface SearchResult {
  model: string,
  pk: number,
  fields: {
    managing_body: string;
    fund: number | null;
    fund_name: string | null;
    quarter: number | string;
    instrument_type: string;
    instrument_sub_type: string;
    instrument_id: number | null;
    orig_instrument_id: number | null;
    instrument_name: string | null;
    issuer: string | null;
    activity_industry: string | null;
    currency: string | null;
    fair_value: number | null;
    market_cap: string | null;
    rate_of_fund: number | null;
    rating_agency: string | null;
    reference_index: string | null;
    intrest_rate: string | null;
    date_of_purchase: string | null;
    average_of_duration: string | null;
    date_of_revaluation: string | null;
    rate: number | null;
    yield_to_maturity: string | null;
    rating: string | null;
    par_value: number | null;
    underlying_asset: string | null;
    type_of_asset: string | null;
    rate_of_ipo: number | null;
    liquidity: string | null;
    asset_type: string | null;
    row_cleansing_time: string | null;
    issuer_number: number | null;
    owner_option: string | null;
    original_issuer_number: number | null;
    isin: string;
    instrument_symbol: string | null;
    movil: string | null;
    sector: string | null;
    dual_trade: boolean;
    cleansing_action: number | null;
  }
}
