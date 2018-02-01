import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import { QuartersService } from '../services/quarters.service';
import { PaiService } from '../services/pai.service';
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
  loadQuarters$: Observable<Action> = this.actions$
    .ofType<LoadQuartersAction>(QuarterActionTypes.LOAD_QUARTERS)
    .switchMap(_ => this.quartersService.getQuarters()
      .map(quartersData => new LoadQuartersSuccessAction(quartersData))
      .catch(() => of({ type: 'LOAD_QUARTERS_FAILED' }))
    );

  @Effect()
  loadPaiAfterNewQuarter$: Observable<Action> = this.actions$
    .ofType<SelectNewQuarterAction>(QuarterActionTypes.SELECT_NEW_QUARTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new LoadPaiAfterNewFilterSuccessAction(paiData))
      .catch(() => of({ type: 'LOAD_PAI_AFTER_NEW_FILTER_FAILED' }))
    );
}
