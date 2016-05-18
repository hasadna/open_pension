import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export interface ManagingBody {
    id: number;
    label: string;
}

@Injectable()
export class ManagingBodyService  {

  constructor(private http: Http) {}

  getManagingBody() {
    return this._http.get('http://localhost:8000//api/managing_bodies/?format=json')
      .map((response: Response) => response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  getManagingBody(id: number) {
    return this._http.get('http://localhost:8000//api/managing_bodies/?format=json')
      .map((response: Response) => response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
