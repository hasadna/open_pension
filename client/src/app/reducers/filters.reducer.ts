import { Filter } from '../models/filter.model';
import { FiltersActionTypes, FiltersActions } from '../actions/filters.actions';

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

export function reducer(state = initialState, action: FiltersActions): State {
  switch (action.type) {
    case FiltersActionTypes.LOAD_INSTRUMENT_LIST: {
      return Object.assign({}, state);
    }

    case FiltersActionTypes.LOAD_INSTRUMENT_LIST_SUCCESS: {
      const newEntities = { entities: action.payload };

      return Object.assign({}, state, newEntities);
    }

    case FiltersActionTypes.SELECT_NEW_FILTER_ACTION: {
      if (state.selectedFilters.length < 5) {
        const newSelectedFilter = state.entities.filter((field) => field.fields_to_show === action.payload);
        const newSelectedFilters = { selectedFilters: [...state.selectedFilters, newSelectedFilter[0]] };
        const newEntities = {entities: state.entities.filter((field) => field.fields_to_show !== action.payload) };

        return Object.assign({}, state, newEntities, newSelectedFilters);
      }

      return state;
    }

    case FiltersActionTypes.REMOVE_SELECTED_FILTER_ACTION: {
      const newEntities = { entities: [...state.entities, action.payload] };
      const newSelectedFilters = {
        selectedFilters: state.selectedFilters.filter(
          (filter) => filter.fields_to_show !== action.payload.fields_to_show
        )
      };

      return Object.assign({}, state, newSelectedFilters, newEntities);
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getSelectedFilters = (state: State) => state.selectedFilters;
