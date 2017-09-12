import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { QuartersService } from '../services/quarters.service';
import { PaiService } from '../services/pai.service';
import * as quarters from '../actions/quarters';
import * as pai from '../actions/pai';

@Injectable()
export class QuartersEffects {
  constructor(
    private actions$: Actions,
    private quartersService: QuartersService,
    private paiService: PaiService,
  ) { }

  @Effect()
  loadQuarters$: Observable<Action>= this.actions$
    .ofType(quarters.LOAD_QUARTERS)
    .switchMap(_ => this.quartersService.getQuarters()
      .map(quartersData => new quarters.LoadQuarterSuccessAction(quartersData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

  @Effect()
  loadPaiAfterNewQuarter$: Observable<Action>= this.actions$
    .ofType(quarters.SELECT_NEW_QUARTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new pai.LoadPaiAfterNewFilterSuccessAction(paiData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

}
