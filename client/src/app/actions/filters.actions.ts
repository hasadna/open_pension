import { Action } from '@ngrx/store';

import { Filter } from '../models/filter.model';

export enum FiltersActionTypes {
  LOAD_INSTRUMENT_LIST = '[Instrument] Load Instrument List',
  LOAD_INSTRUMENT_LIST_SUCCESS = '[Instrument] Load Instrument List Success',
  LOAD_INSTRUMENT_LIST_FAILED = '[Instrument] Load Instrument List Failed',
  SELECT_NEW_FILTER_ACTION = '[Filters] Select New Filter',
  CHANGE_LAYER_OF_FILTER_ACTION = '[Filters] Change Layer Of Filter',
}

export class LoadInstrumentListAction implements Action {
  readonly type = FiltersActionTypes.LOAD_INSTRUMENT_LIST;

  constructor() { }
}

export class LoadInstrumentListSuccessAction implements Action {
  readonly type = FiltersActionTypes.LOAD_INSTRUMENT_LIST_SUCCESS;

  constructor(public payload: Filter[]) { }
}

export class LoadInstrumentFailedAction implements Action {
  readonly type = FiltersActionTypes.LOAD_INSTRUMENT_LIST_FAILED;

  constructor() { }
}

export class SelectNewFilterAction implements Action {
  readonly type = FiltersActionTypes.SELECT_NEW_FILTER_ACTION;

  constructor(public payload: string) { }
}

export class ChangeLayerOfFilterAction implements Action {
  readonly type = FiltersActionTypes.CHANGE_LAYER_OF_FILTER_ACTION;

  constructor() { }
}

export type FiltersActions
  = SelectNewFilterAction
  | ChangeLayerOfFilterAction
  | LoadInstrumentListAction
  | LoadInstrumentListSuccessAction
  | LoadInstrumentFailedAction;
