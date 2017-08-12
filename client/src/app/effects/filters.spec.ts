import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { FiltersEffects } from './filters';
import { Quarter } from '../models/quarter';
import * as filtersAction from '../actions/filters';
import { FiltersService } from '../services/filters.service';

describe('FiltersEffects', () => {
  let effects: FiltersEffects;
  let actions: Observable<any>;

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

  it('loadQuarters$ should work', () => {
    const quarter1 = {
      quarter_id: 111,
      year: '2018',
      month: '03',
    } as Quarter;
    const quarter2 = {
      quarter_id: 222,
      year: '2017',
      month: '02',
    } as Quarter;
    const quarters = [quarter1, quarter2];

    const action = new filtersAction.LoadQuartersAction();
    const completion = new filtersAction.LoadQuarterSuccessAction(quarters);
    actions = hot('--a-', { a: action });

    const expected = cold('--b', { b: completion });

    effects.loadQuarters$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });
});
