import { SearchResult } from '../models/search.model';
import { SearchActionTypes, SearchActions } from '../actions/search.actions';

export interface State {
  entities: SearchResult[];
  selected: SearchResult;
}

const initialState: State = {
  entities: [{
    model: '',
    pk: 0,
    fields: {
      managing_body: '',
      fund: null,
      fund_name: null,
      quarter: '',
      instrument_type: '',
      instrument_sub_type: '',
      instrument_id: null,
      orig_instrument_id: null,
      instrument_name: '',
      issuer: '',
      activity_industry: '',
      currency: '',
      fair_value: null,
      market_cap: '',
      rate_of_fund: null,
      rating_agency: '',
      reference_index: '',
      intrest_rate: '',
      date_of_purchase: '',
      average_of_duration: '',
      date_of_revaluation: '',
      rate: null,
      yield_to_maturity: '',
      rating: '',
      par_value: null,
      underlying_asset: '',
      type_of_asset: '',
      rate_of_ipo: null,
      liquidity: '',
      asset_type: '',
      row_cleansing_time: '',
      issuer_number: null,
      owner_option: '',
      original_issuer_number: null,
      isin: '',
      instrument_symbol: '',
      movil: '',
      sector: '',
      dual_trade: true,
      cleansing_action: null,
    },
  }],
  selected: {
    model: '',
    pk: 0,
    fields: {
      managing_body: '',
      fund: null,
      fund_name: null,
      quarter: '',
      instrument_type: '',
      instrument_sub_type: '',
      instrument_id: null,
      orig_instrument_id: null,
      instrument_name: '',
      issuer: '',
      activity_industry: '',
      currency: '',
      fair_value: null,
      market_cap: '',
      rate_of_fund: null,
      rating_agency: '',
      reference_index: '',
      intrest_rate: '',
      date_of_purchase: '',
      average_of_duration: '',
      date_of_revaluation: '',
      rate: null,
      yield_to_maturity: '',
      rating: '',
      par_value: null,
      underlying_asset: '',
      type_of_asset: '',
      rate_of_ipo: null,
      liquidity: '',
      asset_type: '',
      row_cleansing_time: '',
      issuer_number: null,
      owner_option: '',
      original_issuer_number: null,
      isin: '',
      instrument_symbol: '',
      movil: '',
      sector: '',
      dual_trade: true,
      cleansing_action: null,
    },
  },
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.SEARCH: {
      return state;
    }

    case SearchActionTypes.SEARCH_SUCCESS: {
      const newState = {entities: action.payload};
      return Object.assign({}, state, newState);
    }

    case SearchActionTypes.SELECT_SEARCHED_ITEM: {
        const newState = {selected: action.payload};
        return Object.assign({}, state, newState);
    }

    case SearchActionTypes.SEARCH_FAILED: {
      console.log('LOGIN_FAILED');
      break;
    }


    default: {
      return state;
    }
  }
}

export const getSearchedEntities = (state: State) => state.entities;
export const getSelectedSearchedItem = (state: State) => state.selected;
