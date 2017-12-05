import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ContactEffects } from './contact';
import { Contact } from '../models/contact';
import * as contactAction from '../actions/contact';
import { ContactService } from '../services/contact.service';

describe('ContactEffects', () => {
  let effects: ContactEffects;
  const actions: Observable<any> = Observable.of('');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactEffects,
        provideMockActions(() => actions),
        // other providers
        ContactService,
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

    effects = TestBed.get(ContactEffects);
  });

  it('should create the effects', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
