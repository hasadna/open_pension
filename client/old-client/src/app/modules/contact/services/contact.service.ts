import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Contact } from '../models/contact.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient,
  ) { }

  postNewContact(contactData: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.backend}/api/contact/`, contactData);
  }
}
