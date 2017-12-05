import { Contact } from '../models/contact';
import * as contact from '../actions/contact';

export type State = Contact;

const initialState: State = {
  name: '',
  email: '',
  content: '',
};

export function reducer(state = initialState, action: contact.Actions): State {
  switch (action.type) {
    case contact.SEND_NEW_CONTACT: {
      return initialState;
    }

    case contact.SEND_NEW_CONTACT_SUCCESS: {
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
