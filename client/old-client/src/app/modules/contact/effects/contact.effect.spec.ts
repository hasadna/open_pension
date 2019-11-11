import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { of, Observable, throwError, ReplaySubject } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { ContactEffect } from './contact.effect';
import { ContactService } from '../services/contact.service';
import { SendNewContactAction, SendNewContactSuccessAction } from '../actions/contact.actions';

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

  it('should dispatch SendNewContactSuccessAction when SendNewContactAction dispatched', () => {
    const response = {
      name: 'nir galon',
      email: 'nir@example.com',
      content: 'hi!',
    };

    actions = hot('--a-', { a: new SendNewContactAction(response) });
    const expected = cold('--b', {b: new SendNewContactSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new ContactEffect(new Actions(actions), service);

    expect(effectsAction.sendContact$).toBeObservable(expected);
  });
});

function createServiceStub(response: any) {
  const service = jasmine.createSpyObj('service', [ 'postNewContact' ]);

  const isError = response instanceof Error;
  const serviceResponse = isError ? throwError(response) : of(response);

  service.postNewContact.and.returnValue(serviceResponse);
  return service;
}
