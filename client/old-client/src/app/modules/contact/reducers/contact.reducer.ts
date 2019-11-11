import { Contact } from '../models/contact.model';
import { ContactActionTypes, ContactActions } from '../actions/contact.actions';

export type State = Contact;

const initialState: State = {
  name: '',
  email: '',
  content: '',
  formSubmitted: false,
};


export function reducer(state = initialState, action: ContactActions): State {
  switch (action.type) {
    case ContactActionTypes.SEND_NEW_CONTACT: {
      return Object.assign({}, state);
    }

    case ContactActionTypes.SEND_NEW_CONTACT_SUCCESS: {
      if (!action.payload.email) {
        return {
          name: '',
          email: '',
          content: '',
          formSubmitted: true,
        } as Contact;
      }

      return {
        name: action.payload.name,
        email: action.payload.email,
        content: action.payload.content,
        submittedSuccessfully: true,
        formSubmitted: true,
      } as Contact;
    }

    case ContactActionTypes.SEND_NEW_CONTACT_FAILED: {
      return {
        name: action.payload.name,
        email: action.payload.email,
        content: action.payload.content,
        formSubmitted: true,
        submittedSuccessfully: false,
      } as Contact;
    }

    case ContactActionTypes.RESET_FORM_SUBMITION: {
      return {
        name: '',
        email: '',
        content: '',
        formSubmitted: false,
      } as Contact;
    }

    default: {
      return state;
    }
  }
}
