import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import { PaiService } from '../services/pai.service';
import {
  PaiActionTypes,
  LoadPaiAction,
  LoadPaiSuccessAction,
  LoadPaiAfterNewFilterSuccessAction,
} from '../actions/pai.actions';
import {
  FiltersActionTypes,
  SelectNewFilterAction,
  ChangeLayerOfFilterAction,
  RemoveSelectedFilterAction,
} from '../actions/filters.actions';

@Injectable()
export class PaiEffect {

  constructor(
    private actions$: Actions,
    private paiService: PaiService,
  ) { }

  @Effect()
  loadPai$: Observable<Action> = this.actions$
    .ofType<LoadPaiAction>(PaiActionTypes.LOAD_PAI)
    .switchMap(_ => this.paiService.getPai()
      .map(paiData => new LoadPaiSuccessAction(paiData))
      .catch(() => of({ type: 'LOAD_PAI_FAILED' }))
    );

  @Effect()
  loadPaiAfterNewFilter$: Observable<Action> = this.actions$
    .ofType<SelectNewFilterAction>(FiltersActionTypes.SELECT_NEW_FILTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData))
      .catch(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
    );

  @Effect()
  loadPaiAfterRemoveFilter$: Observable<Action> = this.actions$
    .ofType<RemoveSelectedFilterAction>(FiltersActionTypes.REMOVE_SELECTED_FILTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData))
      .catch(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
    );

  @Effect()
  changeFilterLayer$: Observable<Action> = this.actions$
    .ofType<ChangeLayerOfFilterAction>(FiltersActionTypes.CHANGE_LAYER_OF_FILTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData))
      .catch(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
    );
}
