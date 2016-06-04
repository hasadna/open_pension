import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../../app/';
import { ManagingBody } from './managing-body.model';

@Injectable()
export class ManagingBodyService {

  constructor(
    private http: Http) {}

  getManagingBodies() {
    return this.http.get(environment.baseUrl + 'managing_bodies/?format=json')
      .map((response: Response) => response.json().results)
      .catch(this.handleError);
  }

  getManagingBody(id: number) {
    return this.http.get(environment.baseUrl + 'managing_bodies/' + id + '/?format=json')
      .map((response: Response) => response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
