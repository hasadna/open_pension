import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { PaiEffect } from './pai.effect';
import { PaiService } from '../services/pai.service';

describe('PaiEffect', () => {
  const paiServiceStub = {};
  let effects: PaiEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PaiService, useValue: paiServiceStub },
        PaiEffect,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(PaiEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
