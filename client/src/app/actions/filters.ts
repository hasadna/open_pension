import { Action } from '@ngrx/store';
<<<<<<< HEAD
import { Quarter } from '../models/quarter';
=======
>>>>>>> master
import { Filter } from '../models/filter';
import { Instrument } from '../models/instrument';

export const LOAD_INSTRUMENT_LIST = '[FILTERS] Load Instrument List';
export const LOAD_INSTRUMENT_LIST_SUCCESS = '[FILTERS] Load Instrument List Success';
export const SELECT_NEW_FILTER_ACTION = '[FILTERS] Select New Filter';
<<<<<<< HEAD
=======
export const CHANGE_LAYER_OF_FILTER_ACTION = '[FILTERS] Change Layer Of Filter';
>>>>>>> master

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

<<<<<<< HEAD
  constructor(public payload: Filter[]) { }
=======
  constructor() { }
>>>>>>> master
}

export class SelectNewFilterAction implements Action {
  readonly type = SELECT_NEW_FILTER_ACTION;

  constructor(public payload: string) { }
}


export type Actions
<<<<<<< HEAD
  = LoadQuartersAction
  | LoadQuarterSuccessAction
  | LoadInstrumentListAction
  | LoadInstrumentListSuccessAction
  | SelectNewFilterAction;
=======
  = LoadInstrumentListAction
  | LoadInstrumentListSuccessAction
  | SelectNewFilterAction
  | ChangeLayerOfFilterAction;
>>>>>>> master
