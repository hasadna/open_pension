import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { reducers } from '../reducers';
import { QuartersEffects } from './quarters';
import { Quarter } from '../models/quarter';
import { Filter } from '../models/filter';
import * as quartersAction from '../actions/quarters';
import { QuartersService } from '../services/quarters.service';
import { PaiService } from '../services/pai.service';

describe('QuartersEffects', () => {
  let effects: QuartersEffects;
  const actions: Observable<any> = Observable.of('');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      providers: [
        QuartersEffects,
        provideMockActions(() => actions),
        // other providers
        QuartersService,
        PaiService,
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

    effects = TestBed.get(QuartersEffects);
  });

  it('should create the effects', inject([QuartersService], (service: QuartersService) => {
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

    const action = new quartersAction.LoadQuartersAction();
    const completion = new quartersAction.LoadQuarterSuccessAction(quarters);
    const someAction = new ReplaySubject(1);
    someAction.next(action);

    effects.loadQuarters$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });
});
