import { Quarter } from '../models/quarter';
import * as quarters from '../actions/quarters';

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

export function reducer(state = initialState, action: quarters.Actions): State {
  switch (action.type) {
    case quarters.LOAD_QUARTERS: {
      return initialState;
    }

    case quarters.LOAD_QUARTERS_SUCCESS: {
      const newEntits = { entities: action.payload };

      return Object.assign({}, state, newEntits);
    }

    case quarters.SELECT_NEW_QUARTER_ACTION: {
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
