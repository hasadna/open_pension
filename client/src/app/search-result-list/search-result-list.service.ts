import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from '../../../tmp/vendor-input_base_path-xmxsiXsB.tmp/0/rxjs/Rx.d';
import '../../../node_modules/rxjs/add/operator/map.d';

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