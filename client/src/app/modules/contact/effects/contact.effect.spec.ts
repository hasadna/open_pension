import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { ContactEffect } from './contact.effect';
import { ContactService } from '../services/contact.service';

describe('ContactEffect', () => {
  const contactServiceStub = {};
  let effects: ContactEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ContactService, useValue: contactServiceStub },
        ContactEffect,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(ContactEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
