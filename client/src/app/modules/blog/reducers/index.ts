import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromPosts from './posts.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  posts: fromPosts.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  posts: fromPosts.reducer,
};

/**
 * Layout Reducers
 */
export const getPostsState = createFeatureSelector<fromPosts.State>('posts');

export const getPostsEntities = createSelector(
  getPostsState,
  fromPosts.getEntities
);

export const getPostsCount = createSelector(
  getPostsState,
  fromPosts.getCount
);

export const getPostsNext = createSelector(
  getPostsState,
  fromPosts.getNext
);

export const getPostsPrevious = createSelector(
  getPostsState,
  fromPosts.getPrevious
);

export const getSelectedPost = createSelector(
  getPostsState,
  fromPosts.getSelectedPost
);
