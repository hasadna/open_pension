import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { QuartersService } from '../services/quarters.service';
import * as quarters from '../actions/quarters';

@Injectable()
export class QuartersEffects {
  constructor(
    private actions$: Actions,
    private quartersService: QuartersService
  ) { }

  @Effect()
  loadQuarters$: Observable<Action>= this.actions$
    .ofType(quarters.LOAD_QUARTERS)
    .switchMap(_ => this.quartersService.getQuarters()
      .map(quartersData => new quarters.LoadQuarterSuccessAction(quartersData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

}
