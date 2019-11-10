import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

import * as fromRoot from '../../reducers';
import { SearchResult } from '../../models/search.model';
import { SearchAction, SelectSearchedItemAction } from '../../actions/search.actions';


@Component({
  selector: 'op-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  public searchResults: SearchResult[];
  public searchSubmitted = false;
  public showProgressBar = false;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    store.select(fromRoot.getSearchedEntities).subscribe(
      res => {
        if (res.length > 0) {
          this.searchResults = res;
          if (res[0].pk !== 0) {
             this.searchSubmitted = true;
             this.showProgressBar = false;
          }
        }
      }
    );
  }

  ngOnInit() {
    this.form = new FormGroup({
      'searchInput': new FormControl('', []),
    });
  }

  onSubmit() {
    this.showProgressBar = true;
    const encodedTerm = encodeURI(this.form.value.searchInput);
    this.store.dispatch(new SearchAction(encodedTerm));
  }

  checkValue(inputValue) {
    if (inputValue === '') {
      this.searchSubmitted = false;
    }
  }

  selectSearchedItem(item) {
    this.store.dispatch(new SelectSearchedItemAction(item));
    const encodedUri = encodeURI(item.fields.fund_name);
    this.router.navigate([`detail-pai/${encodedUri}`]);
    this.searchSubmitted = false;
    this.showProgressBar = false;
  }

  showAllResult() {
    this.router.navigate(['/search-result']);
    this.searchSubmitted = false;
  }
}
