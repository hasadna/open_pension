import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Contact } from '../models/contact';

import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  constructor(
    private http: Http,
  ) { }

  postNewContact(contactData: Contact): Observable<Contact> {
    return this.http.post(`${environment.backend}/api/contact/`, contactData)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
