import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { SearchResult } from '../models/search.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {

  constructor(
    private http: HttpClient,
  ) { }

  searchTerm(term): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(`${environment.backend}/search?query=${term}`);
  }
}
