import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PaiService } from '../services/pai.service';
import * as pai from '../actions/pai';
import * as filters from '../actions/filters';

@Injectable()
export class PaiEffects {
  constructor(
    private actions$: Actions,
    private paiService: PaiService
  ) { }

  @Effect()
  loadPai$: Observable<Action>= this.actions$
    .ofType(pai.LOAD_PAI)
    .switchMap(_ => this.paiService.getPai()
      .map(paiData => new pai.LoadPaiSuccessAction(paiData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

  @Effect()
  loadPaiAfterNewFilter$: Observable<Action>= this.actions$
    .ofType(filters.SELECT_NEW_FILTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new pai.LoadPaiAfterNewFilterSuccessAction(paiData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

  @Effect()
  changeFilterLayer$: Observable<Action>= this.actions$
    .ofType(filters.CHANGE_LAYER_OF_FILTER_ACTION)
    .switchMap(_ => this.paiService.getPaiWithFilters()
      .map(paiData => new pai.LoadPaiAfterNewFilterSuccessAction(paiData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

}
