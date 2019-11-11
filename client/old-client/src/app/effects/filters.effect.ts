import { Action } from '@ngrx/store';
import { of , Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

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
  loadFilters$: Observable<Action> = this.actions$.pipe(
    ofType<LoadInstrumentListAction>(FiltersActionTypes.LOAD_INSTRUMENT_LIST),
    switchMap(_ => this.filtersService.getFiltersOptions()
      .pipe(
        map(filtersData => new LoadInstrumentListSuccessAction(filtersData)),
        catchError(() => of({ type: 'LOAD_INSTRUMENT_LIST_FAILED' }))
      )
    )
  );
}
