import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import * as fromRoot from '../../reducers';
import {
  LoadInstrumentListAction,
  SelectNewFilterAction,
  RemoveSelectedFilterAction,
  ChangeLayerOfFilterAction
} from '../../actions/filters.actions';
import { SelectNewQuarterAction, LoadQuartersAction } from '../../actions/quarter.actions';
import { Quarter } from '../../models/quarter.model';
import { Filter } from '../../models/filter.model';

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
    this.store.select(fromRoot.getSelectedQuarter).subscribe(
        selectedQuarterRes => {
          if (selectedQuarterRes.quarter_id) {
            this.selectedQuarter = `${selectedQuarterRes.year}-${selectedQuarterRes.month}`;
            this.store.dispatch(new SelectNewQuarterAction(this.selectedQuarter));
          }
          this.store.select(fromRoot.getQuartersEntities).subscribe(
            res => {
              this.quarters = res;
              if (!selectedQuarterRes.quarter_id) {
                this.selectedQuarter = `${this.quarters[0].year}-${this.quarters[0].month}`;
                this.store.dispatch(new SelectNewQuarterAction(this.selectedQuarter));
              }
            }
          );
        }
    );
    this.store.select(fromRoot.getSelectedFilters).subscribe(
      res => this.selectedFilters = res
    );

    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  ngOnInit() {
    this.selectedFilter = '+ הוספה';
    if (!this.selectedFilters.length) {
      this.store.dispatch(new LoadInstrumentListAction());
    }
    if (this.quarters.length < 2) {
      this.store.dispatch(new LoadQuartersAction());
    }
  }

  selectNewQuarter() {
    this.store.dispatch(new SelectNewQuarterAction(this.selectedQuarter));
  }

  selectNewFilter() {
    this.store.dispatch(new SelectNewFilterAction(this.selectedFilter));
  }

  removeFilter(filter) {
    this.store.dispatch(new RemoveSelectedFilterAction(filter));
  }

  private onDropModel(args) {
    this.store.dispatch(new ChangeLayerOfFilterAction());
  }
}
