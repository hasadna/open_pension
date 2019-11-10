import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Filter } from '../models/filter.model';
import { environment } from '../../environments/environment';

@Injectable()
export class FiltersService {

  constructor(
    private http: HttpClient,
  ) { }

  getFiltersOptions(): Observable<Filter[]> {
    return this.http.get<Filter[]>(`${environment.backend}/api/instrument-fields`);
  }
}
