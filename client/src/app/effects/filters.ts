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
  loadFilters$: Observable<Action>= this.actions$
    .ofType(filters.LOAD_INSTRUMENT_LIST)
    .switchMap(_ => this.filtersService.getFiltersOptions()
      .map(filtersData => new filters.LoadInstrumentListSuccessAction(filtersData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

  @Effect()
  loadFilters$: Observable<Action>= this.actions$
    .ofType(filters.LOAD_INSTRUMENT_LIST)
    .switchMap(_ => this.filtersService.getFiltersOptions()
      .map(filtersData => new filters.LoadInstrumentListSuccessAction(filtersData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

}
