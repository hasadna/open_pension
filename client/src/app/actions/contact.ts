import { Action } from '@ngrx/store';
import { Contact } from '../models/contact';

export const SEND_NEW_CONTACT = '[CONTACT] Send New Contact';
export const SEND_NEW_CONTACT_SUCCESS = '[CONTACT] Send New Contact Success';


export class SendNewContactAction implements Action {
  readonly type = SEND_NEW_CONTACT;

  constructor(public payload: Contact) { }
}

export class SendNewContactSuccessAction implements Action {
  readonly type = SEND_NEW_CONTACT_SUCCESS;

  constructor(public payload: Contact) { }
}

export type Actions
  = SendNewContactAction
  | SendNewContactSuccessAction;
