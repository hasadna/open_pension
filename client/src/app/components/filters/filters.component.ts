import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import * as fromRoot from '../../reducers';
import * as filtersAction from '../../actions/filters';
import * as quartersAction from '../../actions/quarters';
import { Quarter } from '../../models/quarter';
import { Filter } from '../../models/filter';

@Component({
  selector: 'op-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public filters$: Observable<Filter[]>;
  public quarters: Quarter[];
  public selectedFilters: Filter[];
  public selectedQuarter: string;
  public selectedFilter: string;

  constructor(
    private dragulaService: DragulaService,
    private store: Store<fromRoot.State>,
  ) {
    this.filters$ = this.store.select(fromRoot.getFiltersEntities);
    this.store.select(fromRoot.getQuartersEntities).subscribe(
      res => {
        this.quarters = res;
        this.selectedQuarter = `${this.quarters[0].year}-${this.quarters[0].month}`;
        this.store.dispatch(new quartersAction.SelectNewQuarterAction(this.selectedQuarter));
    });
    this.store.select(fromRoot.getSelectedFilters).subscribe(
      res => this.selectedFilters = res
    );

    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  ngOnInit() {
    this.store.dispatch(new quartersAction.LoadQuartersAction());
    this.store.dispatch(new filtersAction.LoadInstrumentListAction());
  }

  selectNewQuarter() {
    this.store.dispatch(new quartersAction.SelectNewQuarterAction(this.selectedQuarter));
  }

  selectNewFilter() {
    this.store.dispatch(new filtersAction.SelectNewFilterAction(this.selectedFilter));
  }

  private onDropModel(args) {
    this.store.dispatch(new filtersAction.ChangeLayerOfFilterAction());
  }

}
