import PageForm, {handleFormSubmit} from "../PageForm";
import {useState, useReducer} from 'react';
import {errorsReducer, valuesReducer} from "componenets/Form/formReducers";
import {Redirect} from "react-router-dom";
import {createPage} from "api/page";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {label: ''});

  const handleSubmit = async () => {
    await handleFormSubmit({
      setIsLoading,
      formValues,
      dispatchError,
      setRedirect,
      sendRequestHandler: async ({label}) => {
        return await createPage({label});
      }
    });
  };

  if (redirect) {
    return <Redirect to={"/front/pages"} />;
  }

  return <PageForm
    user={formValues}
    isLoading={isLoading}
    handleSubmit={handleSubmit} dispatchValue={dispatchValue} errors={errors}/>
}
