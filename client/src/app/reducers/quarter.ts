import { Quarter } from '../models/quarter';
import * as filters from '../actions/filters';

export type  State = Quarter[];

const initialState: State = [{
  quarter_id: 0,
  year: '',
  month: '',
}];

export function reducer(state = initialState, action: filters.Actions): State {
  switch (action.type) {
    case filters.LOAD_QUARTERS: {
      return initialState;
    }

    case filters.LOAD_QUARTERS_SUCCESS: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
