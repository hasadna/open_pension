import { Pai } from '../models/pai.model';
import { PaiActionTypes, PaiActions } from '../actions/pai.actions';

export type  State = Pai;

const initialState: State = {
  name: '',
  children: [],
};

export function reducer(state = initialState, action: PaiActions): State {
  switch (action.type) {
    case PaiActionTypes.LOAD_PAI: {
      return Object.assign({}, state);
    }

    case PaiActionTypes.LOAD_PAI_SUCCESS: {
      return action.payload;
    }

    case PaiActionTypes.LOAD_PAI_AFTER_NEW_FILTER_SUCCESS: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
