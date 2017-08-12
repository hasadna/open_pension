import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Instrument } from '../models/instrument';
import { Quarter } from '../models/quarter';

import { environment } from '../../environments/environment';

@Injectable()
export class FiltersService {

  constructor(
    private http: Http,
  ) { }

  getQuarters(): Observable<Quarter[]> {
    return this.http.get(`${environment.backend}/api/quarter`)
      .map(res => res.json().results)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
