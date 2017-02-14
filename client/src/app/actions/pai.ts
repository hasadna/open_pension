import { Action } from '@ngrx/store';
import { Pai } from '../models/pai';
import { type } from '../util';

export const ActionTypes = {
  LOAD_PAI:                type('[PAI] Load Pai'),
  LOAD_PAI_SUCCESS:        type('[PAI] Load Pai Success'),
};

export class LoadPaiAction implements Action {
  type = ActionTypes.LOAD_PAI;

  constructor() { }
}

export class LoadPaiSuccessAction implements Action {
  type = ActionTypes.LOAD_PAI_SUCCESS;

  constructor(public payload: Pai) { }
}

export type Actions
  = LoadPaiAction
  | LoadPaiSuccessAction;
