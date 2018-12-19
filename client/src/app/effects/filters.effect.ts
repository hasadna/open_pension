import { Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { FiltersService } from '../services/filters.service';
import {
  FiltersActionTypes,
  LoadInstrumentListAction,
  LoadInstrumentListSuccessAction,
} from '../actions/filters.actions';

@Injectable()
export class FiltersEffect {

  constructor(
    private actions$: Actions,
    private filtersService: FiltersService,
  ) { }

  @Effect()
  loadFilters$: Observable<Action> = this.actions$
    .ofType<LoadInstrumentListAction>(FiltersActionTypes.LOAD_INSTRUMENT_LIST)
    .switchMap(_ => this.filtersService.getFiltersOptions()
      .map(filtersData => new LoadInstrumentListSuccessAction(filtersData))
      .catch(() => of({ type: 'LOAD_INSTRUMENT_LIST_FAILED' }))
    );
}
