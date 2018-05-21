import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../../../../reducers';
import { SearchResult } from '../../../../models/search.model';

@Component({
  selector: 'op-all-results',
  templateUrl: './all-results.component.html',
  styleUrls: ['./all-results.component.scss']
})
export class AllResultsComponent {

  public searchResults: SearchResult[];

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    store.select(fromRoot.getSearchedEntities).subscribe(
      res => {
        this.searchResults = res;
      });
  }

  selectItem(item) {
    const encodedUri = encodeURI(item.fields.fund_name);
    this.router.navigate([`detail-pai/${encodedUri}`]);
  }

}
