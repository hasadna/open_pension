import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';


import { ContactService } from '../services/contact.service';
import {
  ContactActionTypes,
  SendNewContactAction,
  SendNewContactSuccessAction,
  SendNewContactFailedAction
} from '../actions/contact.actions';

@Injectable()
export class ContactEffect {

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
  ) { }

  @Effect()
  sendContact$: Observable<Action> = this.actions$.pipe(
    ofType<SendNewContactAction>(ContactActionTypes.SEND_NEW_CONTACT),
    map(action => action.payload),
    switchMap(contactData => {
      return this.contactService.postNewContact(contactData)
      .pipe(
        map((savedContactData) => new SendNewContactSuccessAction(savedContactData)),
        catchError(err => of(new SendNewContactFailedAction(err)))
      );
    })
  );
}
