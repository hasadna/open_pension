import { Action } from '@ngrx/store';

import { Pai } from '../models/pai.model';

export enum PaiActionTypes {
  LOAD_PAI = '[Pai] Load Pai',
  LOAD_PAI_SUCCESS = '[Pai] Load Pai Success',
  LOAD_PAI_FAILED = '[Pai] Load Pai Failed',
  LOAD_PAI_AFTER_NEW_FILTER_SUCCESS = '[Pai] Load Pai After New Filter Success',
  LOAD_PAI_AFTER_NEW_FILTER_FAILED = '[Pai] Load Pai After New Filter Failed',
}

export class LoadPaiAction implements Action {
  readonly type = PaiActionTypes.LOAD_PAI;

  constructor() { }
}

export class LoadPaiSuccessAction implements Action {
  readonly type = PaiActionTypes.LOAD_PAI_SUCCESS;

  constructor(public payload: Pai) { }
}

export class LoadPaiFailedAction implements Action {
  readonly type = PaiActionTypes.LOAD_PAI_FAILED;

  constructor() { }
}

export class LoadPaiAfterNewFilterSuccessAction implements Action {
  readonly type = PaiActionTypes.LOAD_PAI_AFTER_NEW_FILTER_SUCCESS;

  constructor(public payload: Pai) { }
}

export class LoadPaiAfterNewFilterFailedAction implements Action {
  readonly type = PaiActionTypes.LOAD_PAI_AFTER_NEW_FILTER_FAILED;

  constructor() { }
}

export type PaiActions
  = LoadPaiAction
  | LoadPaiSuccessAction
  | LoadPaiFailedAction
  | LoadPaiAfterNewFilterSuccessAction
  | LoadPaiAfterNewFilterFailedAction;
