import { Quarter } from '../models/quarter.model';
import { QuarterActionTypes, QuarterActions } from '../actions/quarter.actions';

export interface State {
  entities: Quarter[];
  selectedQuarter: Quarter;
}

const initialState: State = {
  entities: [{
    quarter_id: 0,
    year: '',
    month: '',
  }],
  selectedQuarter: {
    quarter_id: 0,
    year: '',
    month: '',
  },
};

export function reducer(state = initialState, action: QuarterActions): State {
  switch (action.type) {
    case QuarterActionTypes.LOAD_QUARTERS: {
      return Object.assign({}, state);
    }

    case QuarterActionTypes.LOAD_QUARTERS_SUCCESS: {
      const newEntities = { entities: action.payload };

      return Object.assign({}, state, newEntities);
    }

    case QuarterActionTypes.SELECT_NEW_QUARTER_ACTION: {
      const selectedQuarter = state.entities.filter((field) => `${field.year}-${field.month}` === action.payload);
      const newSelectedQuarters = { selectedQuarter: selectedQuarter[0] };

      return Object.assign({}, state, newSelectedQuarters);
    }

    default: {
      return state;
    }
  }
}


export const getEntities = (state: State) => state.entities;
export const getselectedQuarter = (state: State) => state.selectedQuarter;
