import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { reducers } from '../../reducers';
import { StoreModule } from '@ngrx/store';

import 'rxjs/add/observable/of';

import { FiltersComponent } from './filters.component';
import { Quarter } from '../../models/quarter';
import { Filter } from '../../models/filter';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  const quarters: Observable<Quarter[]> = Observable.of([{
    quarter_id: 111,
    year: '2018',
    month: '03',
  }, {
    quarter_id: 222,
    year: '2017',
    month: '02',
  }]);
  const filters$: Observable<Filter[]> = Observable.of([{
    fields_to_show: 'foo',
    fields_to_show_name: 'Foo',
    color: '#ffffff',
  }, {
    fields_to_show: 'bar',
    fields_to_show_name: 'Bar',
    color: '#000000',
  }]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DragulaModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;

    // Load dummy data
    component.quarters = quarters;
    component.filters$ = filters$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display two quarters options', () => {
    const elements: DebugElement[] = fixture.debugElement.queryAll(By.css('.filters-date-select > option'));
    expect(elements.length).toEqual(2);
  });

  it('should display two filters options and add option', () => {
    const elements: DebugElement[] = fixture.debugElement.queryAll(By.css('.add-button > option'));
    expect(elements.length).toEqual(3);
  });

  it('should not be a filter in selectedFilters$ just yet', () => {
    const elements: DebugElement[] = fixture.debugElement.queryAll(By.css('div.filters-button'));
    expect(elements.length).toEqual(0);
  });
});
