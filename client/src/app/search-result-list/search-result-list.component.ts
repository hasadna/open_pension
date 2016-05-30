import { Component } from '@angular/core';
import { SearchResultDetailComponent } from '../search-result-details/search-result-details.component'

@Component({
  selector: 'op-search-result-list',
  templateUrl: 'app/search-result-list/search-result-list.component.html',
  directives: [SearchResultDetailComponent],

})

export class SearchResultListComponent{

  constructor() {}

  searchResult : any;
  searchResultLabel:string;
}
