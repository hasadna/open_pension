import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Pai } from '../models/pai';

import { environment } from '../../environments/environment';

@Injectable()
export class PaiService {

  constructor(
    private http: Http,
  ) { }

  getPai(): Observable<Pai> {
    return this.http.get('/data/flare.json')
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
