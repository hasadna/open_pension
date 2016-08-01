import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CompaniesService {

  constructor(
    private http: Http) { }

  getCompanies() {
    return this.http.get('app/data/managing-bodies.json')
      .map((res: Response) => res.json())
      .do((data) => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
