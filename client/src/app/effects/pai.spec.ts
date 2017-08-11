import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PaiEffects } from './pai';
import { Pai } from '../models/pai';
import * as paiAction from '../actions/pai';
import { PaiService } from '../services/pai.service';

describe('PaiEffects', () => {
  let effects: PaiEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    actions = hot('--a-', { a: action });

    const expected = cold('--b', { b: completion });

    effects.loadPai$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });
});
