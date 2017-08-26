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
    return this.http.get('http://localhost:8000/filter-pai?two=activity_industry&one=currency')
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
