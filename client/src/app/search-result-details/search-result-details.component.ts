import { Component,Input } from '@angular/core';

@Component({
  selector: 'op-search-result-detail',
  templateUrl: 'app/search-result-detail/search-result-detail.component.html',
  styleUrls: [],
  providers: [],
  directives: [],
  pipes: [],
  inputs : ['serachResult','searchResultLebal']
})

export class SearchResultDetailComponent{

  constructor() {}

    @Input() searchResult: any = searchResultLabel  + 'אין תוצאות עבור' ;
    @Input() searchResultLabel: string;

}
