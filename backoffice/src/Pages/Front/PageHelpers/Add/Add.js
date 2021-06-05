import {handleFormSubmit, PageHelperForm} from "../PageHelperForm";
import {useState, useReducer} from 'react';
import {errorsReducer, valuesReducer} from "componenets/Form/formReducers";
import {Redirect} from "react-router-dom";
import {createPageHelper} from "api/pageHelper";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {description: '', elementID: '', page: null});

  const handleSubmit = async () => {
    await handleFormSubmit({
      setIsLoading,
      formValues,
      dispatchError,
      setRedirect,
      sendRequestHandler: async ({description, elementID, page}) => {
        return await createPageHelper({description, elementID, page});
      }
    });
  };

  if (redirect) {
    return <Redirect to={"/front/page-helpers"} />;
  }

  return <PageHelperForm
    pageHelper={formValues}
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    dispatchValue={dispatchValue}
    errors={errors}/>
}
