import {isEmpty} from "lodash";
import {ADD_ERROR, RESET_ERRORS} from "../../componenets/Form/formReducers";
import {isEmailValid} from "../../componenets/Form/validations";

export const validation = ({dispatchError, formValues}) => {
  const {username, email, password, rePassword, nameToPresent} = formValues;
  dispatchError({ type: RESET_ERRORS});

  if (isEmpty(username)) {
    dispatchError({ type: ADD_ERROR, error: {'username': 'Username is required'}});
  }

  if (isEmpty(email)) {
    dispatchError({ type: ADD_ERROR, error: {'email': 'Email is required'}});
  } else {
    if (!isEmailValid(email)) {
      dispatchError({ type: ADD_ERROR, error: {'email': 'Email is not valid'}});
    }
  }

  if (isEmpty(password)) {
    dispatchError({ type: ADD_ERROR, error: {'password': 'Password is required'}});
  }

  if (isEmpty(rePassword)) {
    dispatchError({ type: ADD_ERROR, error: {'rePassword': 'Password - verification is required'}});
  }

  if (!isEmpty(password) && !isEmpty(rePassword) && password !== rePassword) {
    dispatchError({ type: ADD_ERROR, error: {'password': 'Passwords are not matching'}});
    dispatchError({ type: ADD_ERROR, error: {'rePassword': 'Passwords are not matching'}});
  }
}
