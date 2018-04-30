import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SearchResult } from '../models/search.model';
import { SearchService } from '../services/search.service';
import {
  SearchActionTypes,
  SearchAction,
  SearchSuccessAction,
  SearchFailedAction,
} from '../actions/search.actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<SearchAction>(SearchActionTypes.SEARCH),
    map(action => action.payload),
    switchMap(term => {
      return this.searchService.searchTerm(term)
        .pipe(
          map((data) => new SearchSuccessAction(data)),
          catchError(err => of(new SearchFailedAction(err)))
        );
    })
  );
}
