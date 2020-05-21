import json
import os

from enrichment.consts import ALL_INSTRUMENT_TYPES, GOVERNMENTAL_BONDS, COMPANY_BONDS, STOCKS, MUTUAL_FUNDS, ETF, \
    WARRANTS, \
    OPTIONS, FUTURES, STRUCTURED_PRODUCT, CASH, COMMERCIAL_BONDS, STOCKS_NT, GOVERNMENTAL_BONDS_NT, COMMERCIAL_BONDS_NT, \
    COMPANY_BONDS_NT, MUTUAL_FUNDS_NT, WARRANTS_NT, OPTIONS_NT, FUTURES_CONTRACT_NT, STRUCTURED_PRODUCT_NT, LOANS, \
    SECURITY_DEP_OVER_THREE_MONTHS, REAL_ESTATE, INVESTMENT_IN_HELD_COMPANIES, OTHER_INVESTMENTS, \
    BALANCE_INVESTMENT_COMMITMENT, COORDINATED_COST_COMPANY_BONDS, COORDINATED_COST_BORROWING_CREDIT

from enrichment.enrich.enrich_instruments import enrich_gov_bonds, enrich_company_bonds, enrich_stocks
from enrichment.utils import join_json_strings, save_data_to_file, load_dict_for_enrichment
from enrichment.normalize.instruments_norm import normalize_gov_bonds, normalize_company_bonds, normalize_stocks, \
    normalize_mutual_funds, normalize_etf, normalize_warrants, normalize_options, normalize_futures, \
    normalize_structured_product, normalize_cash, normalize_commercial_bonds, normalize_stocks_nt, \
    normalize_gov_bonds_nt, normalize_commercial_bonds_nt, normalize_company_bonds_nt, \
    normalize_mutual_funds_nt, normalize_warrants_nt, normalize_options_nt, normalize_futures_contract_nt, \
    normalize_structured_product_nt, normalize_loans, normalize_security_dep_over_three_months, normalize_real_estate, \
    normalize_investment_in_held_companies, normalize_other_investments, normalize_balance_investment_commitment, \
    normalize_coordinated_cost_company_bonds, normalize_coordinated_cost_borrowing_credit

norm_switcher = {
    CASH: normalize_cash,
    GOVERNMENTAL_BONDS: normalize_gov_bonds,
    COMMERCIAL_BONDS: normalize_commercial_bonds,
    COMPANY_BONDS: normalize_company_bonds,
    STOCKS: normalize_stocks,
    MUTUAL_FUNDS: normalize_mutual_funds,
    ETF: normalize_etf,
    WARRANTS: normalize_warrants,
    OPTIONS: normalize_options,
    FUTURES: normalize_futures,
    STRUCTURED_PRODUCT: normalize_structured_product,
    GOVERNMENTAL_BONDS_NT: normalize_gov_bonds_nt,
    COMMERCIAL_BONDS_NT: normalize_commercial_bonds_nt,
    COMPANY_BONDS_NT: normalize_company_bonds_nt,
    STOCKS_NT: normalize_stocks_nt,
    MUTUAL_FUNDS_NT: normalize_mutual_funds_nt,
    WARRANTS_NT: normalize_warrants_nt,
    OPTIONS_NT: normalize_options_nt,
    FUTURES_CONTRACT_NT: normalize_futures_contract_nt,
    STRUCTURED_PRODUCT_NT: normalize_structured_product_nt,
    # LOANS: normalize_loans,
    # SECURITY_DEP_OVER_THREE_MONTHS: normalize_security_dep_over_three_months,
    REAL_ESTATE: normalize_real_estate,
    # INVESTMENT_IN_HELD_COMPANIES: normalize_investment_in_held_companies,
    # OTHER_INVESTMENTS: normalize_other_investments,
    # BALANCE_INVESTMENT_COMMITMENT: normalize_balance_investment_commitment,
    # COORDINATED_COST_COMPANY_BONDS: normalize_coordinated_cost_company_bonds,
    # COORDINATED_COST_BORROWING_CREDIT: normalize_coordinated_cost_borrowing_credit
}

enrich_switcher = {
    GOVERNMENTAL_BONDS: enrich_gov_bonds,
    COMPANY_BONDS: enrich_company_bonds,
    STOCKS: enrich_stocks
}


def process_json(data):
    dfs_dict = load_dict_for_enrichment(data)
    error_indices_list = []

    processed_data = []
    errors_data = []

    for instrument in ALL_INSTRUMENT_TYPES:
        if instrument in dfs_dict.keys():
            df = dfs_dict.get(instrument)
            if norm_switcher.get(instrument):
                df, error_indices_list = norm_switcher[instrument](df, error_indices_list)

            if enrich_switcher.get(instrument):
                df, error_indices_list = enrich_switcher[instrument](df, error_indices_list)

            processed_data.append(df.to_json(orient="records"))  # adding as json and not dict to preserve nulls
            errors_data.append(df[df.index.isin(error_indices_list)].to_json(orient="records"))


    processed_json = join_json_strings(processed_data)
    errors_json = join_json_strings(errors_data)

    return processed_json, errors_json

