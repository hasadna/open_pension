import { Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

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
  loadPai$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPaiAction>(PaiActionTypes.LOAD_PAI),
    switchMap(_ => this.paiService.getPai()
      .pipe(
        map(paiData => new LoadPaiSuccessAction(paiData)),
        catchError(() => of({ type: 'LOAD_PAI_FAILED' }))
      )
    )
  );

  @Effect()
  loadPaiAfterNewFilter$: Observable<Action> = this.actions$.pipe(
    ofType<SelectNewFilterAction>(FiltersActionTypes.SELECT_NEW_FILTER_ACTION),
    switchMap(_ => this.paiService.getPaiWithFilters()
      .pipe(
        map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData)),
        catchError(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
      )
    )
  );

  @Effect()
  loadPaiAfterRemoveFilter$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveSelectedFilterAction>(FiltersActionTypes.REMOVE_SELECTED_FILTER_ACTION),
    switchMap(_ => this.paiService.getPaiWithFilters()
      .pipe(
        map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData)),
        catchError(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
      )
    )
  );

  @Effect()
  changeFilterLayer$: Observable<Action> = this.actions$.pipe(
    ofType<ChangeLayerOfFilterAction>(FiltersActionTypes.CHANGE_LAYER_OF_FILTER_ACTION),
    switchMap(_ => this.paiService.getPaiWithFilters()
      .pipe(
        map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData)),
        catchError(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
      )
    )
  );
}
