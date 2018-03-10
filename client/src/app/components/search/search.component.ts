import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { SearchResult } from '../../models/search.model'
import { SearchAction } from '../../actions/search.actions';


@Component({
  selector: 'op-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  public searchResult$: Observable<SearchResult[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.searchResult$ = store.select(fromRoot.getSearchState)
  }

  ngOnInit() {
    this.form = new FormGroup({
      'searchInput': new FormControl('', []),
    });
  }

  onSubmit() {
    const encodedTerm = encodeURI(this.form.value.searchInput);
    this.store.dispatch(new SearchAction(encodedTerm));

    console.log(this.searchResult$);
  }
}
