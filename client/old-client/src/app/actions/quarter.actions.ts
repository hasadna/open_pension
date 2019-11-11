import { Action } from '@ngrx/store';

import { Quarter } from '../models/quarter.model';

export enum QuarterActionTypes {
  LOAD_QUARTERS = '[Quarter] Load Quarters',
  LOAD_QUARTERS_SUCCESS = '[Quarter] Load Quarters Success',
  LOAD_QUARTERS_FAILED = '[Quarter] Load Quarters Failed',
  SELECT_NEW_QUARTER_ACTION = '[Quarter] Select New Quarter',
}

export class LoadQuartersAction implements Action {
  readonly type = QuarterActionTypes.LOAD_QUARTERS;

  constructor() { }
}

export class LoadQuartersSuccessAction implements Action {
  readonly type = QuarterActionTypes.LOAD_QUARTERS_SUCCESS;

  constructor(public payload: Quarter[]) { }
}

export class LoadQuartersFailedAction implements Action {
  readonly type = QuarterActionTypes.LOAD_QUARTERS_FAILED;

  constructor() { }
}

export class SelectNewQuarterAction implements Action {
  readonly type = QuarterActionTypes.SELECT_NEW_QUARTER_ACTION;

  constructor(public payload: string) { }
}

export type QuarterActions
  = LoadQuartersAction
  | LoadQuartersSuccessAction
  | LoadQuartersFailedAction
  | SelectNewQuarterAction;
