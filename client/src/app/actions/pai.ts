import { Action } from '@ngrx/store';
import { Pai } from '../models/pai';

export const LOAD_PAI = '[PAI] Load Pai';
export const LOAD_PAI_SUCCESS = '[PAI] Load Pai Success';
export const LOAD_PAI_AFTER_NEW_FILTER_SUCCESS = '[PAI] Load Pai After New Filter Success';

export class LoadPaiAction implements Action {
  readonly type = LOAD_PAI;

  constructor() { }
}

export class LoadPaiSuccessAction implements Action {
  readonly type = LOAD_PAI_SUCCESS;

  constructor(public payload: Pai) { }
}

export class LoadPaiAfterNewFilterSuccessAction implements Action {
  readonly type = LOAD_PAI_AFTER_NEW_FILTER_SUCCESS;

  constructor(public payload: Pai) { }
}

export type Actions
  = LoadPaiAction
  | LoadPaiSuccessAction
  | LoadPaiAfterNewFilterSuccessAction;
