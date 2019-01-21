import { Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { PaiService } from '../services/pai.service';
import { QuartersService } from '../services/quarters.service';
import {
  QuarterActionTypes,
  LoadQuartersAction,
  LoadQuartersSuccessAction,
  SelectNewQuarterAction,
} from '../actions/quarter.actions';
import { LoadPaiAfterNewFilterSuccessAction } from '../actions/pai.actions';

@Injectable()
export class QuartersEffect {

  constructor(
    private actions$: Actions,
    private quartersService: QuartersService,
    private paiService: PaiService,
  ) { }

  @Effect()
  loadQuarters$: Observable<Action> = this.actions$.pipe(
    ofType<LoadQuartersAction>(QuarterActionTypes.LOAD_QUARTERS),
    switchMap(_ => this.quartersService.getQuarters()
      .pipe(
        map(quartersData => new LoadQuartersSuccessAction(quartersData)),
        catchError(() => of({ type: 'LOAD_QUARTERS_FAILED' }))
      )
    )
  );

  @Effect()
  loadPaiAfterNewQuarter$: Observable<Action> = this.actions$.pipe(
    ofType<SelectNewQuarterAction>(QuarterActionTypes.SELECT_NEW_QUARTER_ACTION),
    switchMap(_ => this.paiService.getPaiWithFilters()
      .pipe(
        map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData)),
        catchError(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
      )
    )
  );
}
