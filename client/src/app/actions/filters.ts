import { Action } from '@ngrx/store';
import { Quarter } from '../models/quarter';
import { Filter } from '../models/filter';
import { Instrument } from '../models/instrument';

export const LOAD_QUARTERS = '[FILTERS] Load Quarters';
export const LOAD_QUARTERS_SUCCESS = '[FILTERS] Load Quarters Success';
export const LOAD_INSTRUMENT_LIST = '[FILTERS] Load Instrument List';
export const LOAD_INSTRUMENT_LIST_SUCCESS = '[FILTERS] Load Instrument List Success';
export const SELECT_NEW_FILTER_ACTION = '[FILTERS] Select New Filter';
export const CHANGE_LAYER_OF_FILTER_ACTION = '[FILTERS] Change Layer Of Filter';

export class LoadQuartersAction implements Action {
  readonly type = LOAD_QUARTERS;

  constructor() { }
}

export class LoadQuarterSuccessAction implements Action {
  readonly type = LOAD_QUARTERS_SUCCESS;

  constructor(public payload: Quarter[]) { }
}

export class LoadInstrumentListAction implements Action {
  readonly type = LOAD_INSTRUMENT_LIST;

  constructor() { }
}

export class LoadInstrumentListSuccessAction implements Action {
  readonly type = LOAD_INSTRUMENT_LIST_SUCCESS;

  constructor(public payload: Filter[]) { }
}

export class SelectNewFilterAction implements Action {
  readonly type = SELECT_NEW_FILTER_ACTION;

  constructor(public payload: string) { }
}

export class ChangeLayerOfFilterAction implements Action {
  readonly type = CHANGE_LAYER_OF_FILTER_ACTION;

  constructor() { }
}

export type Actions
  = LoadQuartersAction
  | LoadQuarterSuccessAction
  | LoadInstrumentListAction
  | LoadInstrumentListSuccessAction
  | SelectNewFilterAction
  | ChangeLayerOfFilterAction;
