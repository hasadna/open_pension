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
  loadQuarter$: Observable<Action>= this.actions$
    .ofType(filters.LOAD_QUARTERS)
    .switchMap(() => this.filtersService.getQuarters())
    .map(data => new filters.LoadQuarterSuccessAction(data));
}
