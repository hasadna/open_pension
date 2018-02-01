import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import { ContactService } from '../services/contact.service';
import {
  ContactActionTypes,
  SendNewContactAction,
  SendNewContactSuccessAction,
} from '../actions/contact.actions';

@Injectable()
export class ContactEffect {

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
  ) { }

  @Effect()
  sendContact$: Observable<Action> = this.actions$
    .ofType<SendNewContactAction>(ContactActionTypes.SEND_NEW_CONTACT)
    .switchMap(contactData => this.contactService.postNewContact(contactData.payload)
      .map(savedContactData => new SendNewContactSuccessAction(savedContactData))
      .catch(() => of({ type: 'SEND_NEW_CONTACT_FAILED' }))
    );
}
