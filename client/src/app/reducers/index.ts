import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

 import * as fromFilters from './filters.reducer';
 import * as fromQuarter from './quarter.reducer';
 import * as fromPai from './pai.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  filters: fromFilters.State;
  quarters: fromQuarter.State;
  pai: fromPai.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  filters: fromFilters.reducer,
  quarters: fromQuarter.reducer,
  pai: fromPai.reducer,
};

/**
 * Layout Reducers
 */
export const getPaiState = createFeatureSelector<fromPai.State>('pai');
export const getFiltersState = createFeatureSelector<fromFilters.State>('filters');
export const getQuartersState = createFeatureSelector<fromQuarter.State>('quarters');

export const getFiltersEntities = createSelector(
  getFiltersState,
  fromFilters.getEntities
);

export const getSelectedFilters = createSelector(
  getFiltersState,
  fromFilters.getSelectedFilters
);

export const getQuartersEntities = createSelector(
  getQuartersState,
  fromQuarter.getEntities
);

export const getSelectedQuarter = createSelector(
  getQuartersState,
  fromQuarter.getselectedQuarter
);
