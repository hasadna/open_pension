import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

// import exampleReducer, * as fromExample from './example';

export interface AppState {
  // example: fromExample.ExampleState;
};

export default compose(combineReducers)({
  // example: exampleReducer
});
