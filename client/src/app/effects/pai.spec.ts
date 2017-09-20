import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { provideMockActions } from '@ngrx/effects/testing';

import { reducers } from '../reducers';
import { PaiEffects } from './pai';
import { Pai } from '../models/pai';
import * as paiAction from '../actions/pai';
import { PaiService } from '../services/pai.service';

describe('PaiEffects', () => {
  let effects: PaiEffects;
  const actions: Observable<any> = Observable.of('');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      providers: [
        PaiEffects,
        provideMockActions(() => actions),
        // other providers
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

    effects = TestBed.get(PaiEffects);
  });

  it('should create the effects', inject([PaiEffects], (service: PaiEffects) => {
    expect(service).toBeTruthy();
  }));

  it('should work', () => {
    const pai = {
      name: 'someName',
      children: ['2015, 2016'],
    } as Pai;

    const action = new paiAction.LoadPaiAction();
    const completion = new paiAction.LoadPaiSuccessAction(pai);
    const someAction = new ReplaySubject(1);
    someAction.next(action);

    effects.loadPai$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });
});
