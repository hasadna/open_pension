import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ContactService } from '../services/contact.service';
import * as contactAction from '../actions/contact';

@Injectable()
export class ContactEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) { }

  @Effect()
  sendContact$: Observable<Action>= this.actions$
    .ofType(contactAction.SEND_NEW_CONTACT)
    .map(toPayload)
    .switchMap(contactData => this.contactService.postNewContact(contactData)
      .map(savedContactData => new contactAction.SendNewContactSuccessAction(savedContactData))
      // .catch(error => Observable.of(getPostsFail(error)))
    );

}
