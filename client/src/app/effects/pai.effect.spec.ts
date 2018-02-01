import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { PaiEffect } from './pai.effect';

describe('PaiEffect', () => {
  const avatarServiceStub = {};
  let effects: PaiEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PaiEffect ],
    });

    effects = TestBed.get(PaiEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
