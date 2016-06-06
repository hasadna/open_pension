import { Component, OnInit, Output ,Input } from '@angular/core';
import {Observable} from '../../../node_modules/rxjs/Observable.d.ts';

import { SearchResultDetailComponent } from '../search-result-details/search-result-details.component';
import { SearchResultService } from  'search-result-list.service.ts';

@Component({
  selector: 'op-search-result-list',
  templateUrl: 'app/search-result-list/search-result-list.component.html',
  providers: [SearchResultService],
  directives: [SearchResultDetailComponent]
})

export class SearchResultListComponent implements OnInit{
  searchResultList: Observable<SearchResultDetailComponent[]>;

  constructor(private searchResultService : SearchResultService ) {}

  ngOnInit() {
    this.getSearchResult();
  }

  getSearchResult(){
    this.searchResultList = this.searchResultService.getSearchResult();
  }

}
