import { Action } from '@ngrx/store';

import { SearchResult } from '../models/search.model';

export enum SearchActionTypes {
  SEARCH = '[Search] Search',
  SEARCH_SUCCESS = '[Search] Search Success',
  SEARCH_FAILED = '[Search] Search Failed',
  SELECT_SEARCHED_ITEM = '[Search] Select Searched Item',
}

export class SearchAction implements Action {
  readonly type = SearchActionTypes.SEARCH;

  constructor(public payload: string) { }
}

export class SearchSuccessAction implements Action {
  readonly type = SearchActionTypes.SEARCH_SUCCESS;

  constructor(public payload: SearchResult[]) { }
}

export class SearchFailedAction implements Action {
  readonly type = SearchActionTypes.SEARCH_FAILED;

  constructor(public payload: any) { }
}

export class SelectSearchedItemAction implements Action {
  readonly type = SearchActionTypes.SELECT_SEARCHED_ITEM;

  constructor(public payload: SearchResult) { }
}

export type SearchActions
  = SearchAction
  | SearchSuccessAction
  | SearchFailedAction
  | SelectSearchedItemAction;
