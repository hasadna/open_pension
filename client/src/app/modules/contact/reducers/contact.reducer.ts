import { Contact } from '../models/contact.model';
import { ContactActionTypes, ContactActions } from '../actions/contact.actions';

export type State = Contact;

const initialState: State = {
  name: '',
  email: '',
  content: '',
};


export function reducer(state = initialState, action: ContactActions): State {
  switch (action.type) {
    case ContactActionTypes.SEND_NEW_CONTACT: {
      return Object.assign({}, state);
    }

    case ContactActionTypes.SEND_NEW_CONTACT_SUCCESS: {
      if (action.payload.email) {
        return {
          name: '',
          email: '',
          content: '',
        } as Contact;
      }

      return {
        name: action.payload.name,
        email: action.payload.email,
        content: action.payload.content,
      } as Contact;
    }

    default: {
      return state;
    }
  }
}
