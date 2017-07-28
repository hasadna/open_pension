import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as filtersAction from '../../actions/filters';
import { Quarter } from '../../models/quarter';

@Component({
  selector: 'op-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public quarters$: Observable<Quarter[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.quarters$ = this.store.select(fromRoot.getQuarterState);
  }

  ngOnInit() {
    this.store.dispatch(new filtersAction.LoadQuartersAction());
  }

}
