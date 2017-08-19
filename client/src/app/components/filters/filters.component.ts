import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as filtersAction from '../../actions/filters';
import { Quarter } from '../../models/quarter';
import { Filter } from '../../models/filter';

@Component({
  selector: 'op-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public quarters$: Observable<Quarter[]>;
  public filters$: Observable<Filter[]>;
  public selectedFilters$: Observable<Filter[]>;
  public selectedFilter: string;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.quarters$ = this.store.select(fromRoot.getQuarterState);
    this.filters$ = this.store.select(fromRoot.getFiltersEntities);
    this.selectedFilters$ = this.store.select(fromRoot.getSelectedFilters);
  }

  ngOnInit() {
    this.store.dispatch(new filtersAction.LoadQuartersAction());
    this.store.dispatch(new filtersAction.LoadInstrumentListAction());
  }

  selectNewFilter() {
    this.store.dispatch(new filtersAction.SelectNewFilterAction(this.selectedFilter));
  }

}
