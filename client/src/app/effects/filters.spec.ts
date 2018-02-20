import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { FiltersEffects } from './filters';
import { Quarter } from '../models/quarter';
import { Filter } from '../models/filter';
import * as filtersAction from '../actions/filters';
import { FiltersService } from '../services/filters.service';

describe('FiltersEffects', () => {
  let effects: FiltersEffects;
  const actions: Observable<any> = Observable.of('');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FiltersEffects,
        provideMockActions(() => actions),
        // other providers
        FiltersService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
      ],
    });

    effects = TestBed.get(FiltersEffects);
  });

  it('should create the effects', inject([FiltersService], (service: FiltersService) => {
    expect(service).toBeTruthy();
  }));

  it('loadFilters$ should work', () => {
    const filter1 = {
      fields_to_show: 'foo',
      fields_to_show_name: 'Foo',
      color: '#ffffff',
    } as Filter;
    const filter2 = {
      fields_to_show: 'bar',
      fields_to_show_name: 'Bar',
      color: '#000000',
    } as Filter;
    const filters = [filter1, filter2];

    const action = new filtersAction.LoadInstrumentListAction();
    const completion = new filtersAction.LoadInstrumentListSuccessAction(filters);
    const someAction = new ReplaySubject(1);
    someAction.next(action);

    effects.loadFilters$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });
});