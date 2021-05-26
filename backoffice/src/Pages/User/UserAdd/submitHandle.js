import {isEmpty} from "lodash";
import {ADD_ERROR, RESET_ERRORS} from "componenets/Form/formReducers";
import {isEmailValid} from "componenets/Form/validations";

export const validation = ({dispatchError, formValues, passwordRequired = true}) => {
  const {username, email, password, rePassword, nameToPresent} = formValues;
  dispatchError({ type: RESET_ERRORS});
  let isFormValid = true;

  if (isEmpty(username)) {
    dispatchError({ type: ADD_ERROR, error: {'username': 'Username is required'}});
    isFormValid = false;
  }

  if (isEmpty(email)) {
    dispatchError({ type: ADD_ERROR, error: {'email': 'Email is required'}});
    isFormValid = false;
  } else {
    if (!isEmailValid(email)) {
      dispatchError({ type: ADD_ERROR, error: {'email': 'Email is not valid'}});
      isFormValid = false;
    }
  }

  if (passwordRequired && isEmpty(password)) {
    dispatchError({ type: ADD_ERROR, error: {'password': 'Password is required'}});
    isFormValid = false;
  }

  if (passwordRequired && isEmpty(rePassword)) {
    dispatchError({ type: ADD_ERROR, error: {'rePassword': 'Password - verification is required'}});
    isFormValid = false;
  }

  let checkPassword;

  if (passwordRequired) {
    checkPassword = true;
  } else {
    // The password are not required, we could be editing a user, but one of the passwords has been changed - both of
    // the passwords need to be checked.
    checkPassword = !isEmpty(password) || !isEmpty(rePassword);
  }

  if (checkPassword === true && password !== rePassword) {
    dispatchError({ type: ADD_ERROR, error: {'password': 'Passwords are not matching'}});
    dispatchError({ type: ADD_ERROR, error: {'rePassword': 'Passwords are not matching'}});
    isFormValid = false;
  }

  return isFormValid;
}
