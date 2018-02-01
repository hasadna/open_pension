import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { QuartersEffect } from './quarters.effect';

describe('QuartersEffect', () => {
  const avatarServiceStub = {};
  let effects: QuartersEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ QuartersEffect ],
    });

    effects = TestBed.get(QuartersEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
