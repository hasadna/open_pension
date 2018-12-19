import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Quarter } from '../models/quarter.model';
import { environment } from '../../environments/environment';

@Injectable()
export class QuartersService {

  constructor(
    private http: HttpClient,
  ) { }

  getQuarters(): Observable<Quarter[]> {
    return this.http.get<Quarter[]>(`${environment.backend}/api/quarter`);
  }
}
