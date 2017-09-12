import { Filter } from '../models/filter';
import * as filters from '../actions/filters';

export interface State {
  entities: Filter[];
  selectedFilters: Filter[];
}

const initialState: State = {
  entities: [{
    fields_to_show: '',
    fields_to_show_name: '',
    color: '',
  }],
  selectedFilters: [],
};

export function reducer(state = initialState, action: filters.Actions): State {
  switch (action.type) {
    case filters.LOAD_INSTRUMENT_LIST: {
      return initialState;
    }

    case filters.LOAD_INSTRUMENT_LIST_SUCCESS: {
      const newEntits = { entities: action.payload };

      return Object.assign({}, state, newEntits);
    }

    case filters.SELECT_NEW_FILTER_ACTION: {
      if (state.selectedFilters.length < 5) {
        const newSelectedFilter = state.entities.filter((field) => field.fields_to_show === action.payload);
        const newSelectedFilters = { selectedFilters: [...state.selectedFilters, newSelectedFilter[0]] };
        const newEntities = {entities: state.entities.filter((field) => field.fields_to_show !== action.payload) };

        return Object.assign({}, state, newEntities, newSelectedFilters);
      }

      return state;
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedFilters = (state: State) => state.selectedFilters;
