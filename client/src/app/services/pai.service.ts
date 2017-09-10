import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Pai } from '../models/pai';
import * as fromRoot from '../reducers';

import { environment } from '../../environments/environment';

@Injectable()
export class PaiService {

  constructor(
    private http: Http,
    private store: Store<fromRoot.State>,
  ) { }

  getPai(): Observable<Pai> {
    return this.http.get('http://localhost:8000/filter-pai')
      .map(res => res.json())
      .catch(this.handleError);
  }

  getPaiWithFilters(): Observable<Pai> {
    const query_level = ['one', 'two', 'three', 'four'];
    let query = '';

    // Get all filters.
    this.store.select(fromRoot.getSelectedFilters).subscribe(
      res => {
        res.map((filter, index) => {
          query += `&${query_level[index]}=${filter.fields_to_show}`;
        });
      }
    );

    return this.http.get(`http://localhost:8000/filter-pai?${query}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
