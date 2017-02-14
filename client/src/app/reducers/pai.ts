import { Pai } from '../models/pai';
import * as pai from '../actions/pai';

export type  State = Pai;

const initialState: State = {
  name: '',
  children: [],
};

export function reducer(state = initialState, action: pai.Actions): State {
  switch (action.type) {
    case pai.ActionTypes.LOAD_PAI: {
      return initialState;
    }

    case pai.ActionTypes.LOAD_PAI_SUCCESS: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
