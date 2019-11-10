import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import * as fromRoot from '../reducers';
import { Pai } from '../models/pai.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PaiService {

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
  ) { }

  getPai(): Observable<Pai> {
    return this.http.get<Pai>(`${environment.backend}/filter-pai`);
  }

  getPaiWithFilters(): Observable<Pai> {
    const query_level = ['one', 'two', 'three', 'four', 'five'];
    let query = '';

    // Get all filters.
    this.store.select(fromRoot.getSelectedFilters).subscribe(
      res => {
        res.map((filter, index) => {
          query += `&${query_level[index]}=${filter.fields_to_show}`;
        });
      }
    );
    this.store.select(fromRoot.getSelectedQuarter).subscribe(
      res => query += `&quarter=${res.quarter_id}`
    );

    return this.http.get<Pai>(`${environment.backend}/filter-pai?${query}`);
  }
}
