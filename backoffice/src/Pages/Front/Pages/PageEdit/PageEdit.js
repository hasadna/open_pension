import PageForm from "../PageForm";
import {useState, useReducer} from 'react';
import {ADD_ERROR, errorsReducer, valuesReducer} from "componenets/Form/formReducers";
import {Redirect} from "react-router-dom";
import {isEmpty} from 'lodash';
import {createPage} from "api/page";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {label: ''});

  const handleSubmit = async () => {
    setIsLoading(true);
    const {label} = formValues;

    if (isEmpty(label)) {
      dispatchError({ type: ADD_ERROR, error: {label: 'The field is required'}});
      setIsLoading(false);
      return;
    }

    const {error} = await createPage({label});

    if (!isEmpty(error)) {
      // todo: handle.
      return;
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/front/pages"} />;
  }

  return <PageForm
    user={formValues}
    isLoading={isLoading}
    handleSubmit={handleSubmit} dispatchValue={dispatchValue} errors={errors}/>
}
