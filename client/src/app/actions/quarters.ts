import { Action } from '@ngrx/store';
import { Quarter } from '../models/quarter';

export const LOAD_QUARTERS = '[QUARTERS] Load Quarters';
export const LOAD_QUARTERS_SUCCESS = '[QUARTERS] Load Quarters Success';
export const SELECT_NEW_QUARTER_ACTION = '[QUARTERS] Select New Quarter';

export class LoadQuartersAction implements Action {
  readonly type = LOAD_QUARTERS;

  constructor() { }
}

export class LoadQuarterSuccessAction implements Action {
  readonly type = LOAD_QUARTERS_SUCCESS;

  constructor(public payload: Quarter[]) { }
}

export class SelectNewQuarterAction implements Action {
  readonly type = SELECT_NEW_QUARTER_ACTION;

  constructor(public payload: string) { }
}

export type Actions
  = LoadQuartersAction
  | LoadQuarterSuccessAction
  | SelectNewQuarterAction;
