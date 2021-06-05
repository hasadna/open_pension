import {isString} from 'lodash';

export const ADD_ERROR = 'setError';
export const RESET_ERRORS = 'resetErrors';
export const SET_ELEMENT_VALUE = 'setElement';
export const SET_VALUES = 'setValues';

export const errorsReducer = (state, {type, error}) => {
  switch (type) {
    case ADD_ERROR:
      const [elementName] = Object.keys(error);
      return {
        ...state,
        ...{[`${elementName}Error`]: error[elementName]},
        formIsValid: false,
      }
    case RESET_ERRORS:
      return {
        formIsValid: true,
      };
    default:
      return state;
  }
};

export const valuesReducer = (state, {element, name, action = SET_ELEMENT_VALUE, newState = {}}) => {
  if (action === SET_ELEMENT_VALUE) {
    let value;
    if (isString(element)) {
      value = element;
    } else {
      element.preventDefault();
      value = element.target.value;
    }
    return {...state, ...{[name]: value}};
  }

  return {...state, ...newState}
}
