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

 import * as fromPai from './pai';
 import * as fromQuarter from './quarter';
 import * as fromFilters from './filters';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  pai: fromPai.State;
  quarter: fromQuarter.State;
  filters: fromFilters.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  pai: fromPai.reducer,
  quarter: fromQuarter.reducer,
  filters: fromFilters.reducer,
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: ActionReducer<any, any>[] = !environment.production
  ? []
  : [];

/**
 * Layout Reducers
 */
export const getPaiState = createFeatureSelector<fromPai.State>('pai');
export const getQuarterState = createFeatureSelector<fromQuarter.State>('quarter');
export const getFiltersState = createFeatureSelector<fromFilters.State>('filters');


export const getFiltersEntities = createSelector(
  getFiltersState,
  fromFilters.getEntities
);

export const getSelectedFilters = createSelector(
  getFiltersState,
  fromFilters.getSelectedFilters
);
