import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Instrument } from '../models/instrument';
import { Quarter } from '../models/quarter';

@Injectable()
export class FiltersService {

  constructor(
    private http: Http,
  ) { }

  getQuarters(): Observable<Quarter[]> {
    return this.http.get(`/api/quarter`)
      .map(res => res.json().results)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
