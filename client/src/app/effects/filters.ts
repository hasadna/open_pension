import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FiltersService } from '../services/filters.service';
import * as filters from '../actions/filters';

@Injectable()
export class FiltersEffects {
  constructor(
    private actions$: Actions,
    private filtersService: FiltersService
  ) { }

  @Effect()
  loadQuarters$: Observable<Action>= this.actions$
    .ofType(filters.LOAD_QUARTERS)
    .switchMap(_ => this.filtersService.getQuarters()
      .map(quartersData => new filters.LoadQuarterSuccessAction(quartersData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

}
