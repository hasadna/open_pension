export const ADD_ERROR = 'setError';
export const RESET_ERRORS = 'resetErrors';

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

export const valuesReducer = (state, {element, name}) => {
  element.preventDefault();
  return {...state, ...{[name]: element.target.value}};
}
