import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { ContactEffect } from './contact.effect';

describe('ContactEffect', () => {
  const avatarServiceStub = {};
  let effects: ContactEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ContactEffect ],
    });

    effects = TestBed.get(ContactEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
