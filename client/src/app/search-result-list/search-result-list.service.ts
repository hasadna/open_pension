import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CONFIG } from '../config';

export interface SearchResult {
    search: string;
}


@Injectable()
export class SearchResultService {

    constructor(private http:Http) {}

    getSearchResult(search : string) {
        return this.http.get(CONFIG.baseUrls + 'search_result/' + search + '?format=json')
            .map((response: Response) => response.json().results)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}