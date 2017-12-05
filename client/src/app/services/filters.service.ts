import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Filter } from '../models/filter';

import { environment } from '../../environments/environment';

@Injectable()
export class FiltersService {

  constructor(
    private http: Http,
  ) { }

  getFiltersOptions(): Observable<Filter[]> {
    return this.http.get(`${environment.backend}/api/instrument-fields`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
