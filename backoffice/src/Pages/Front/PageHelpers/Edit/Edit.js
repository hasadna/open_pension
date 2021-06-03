import {handleFormSubmit, PageHelperForm} from "../PageHelperForm";
import {useState, useReducer, useEffect} from 'react';
import {errorsReducer, SET_VALUES, valuesReducer} from "componenets/Form/formReducers";
import {Redirect, useParams} from "react-router-dom";
import {getPageHelper} from "api/pageHelper";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {description: '', elementID: '', page: null,});
  const {id} = useParams();

  useEffect(async() => {
    let {data: {elementID, description, page: {id: page}}} = await getPageHelper(id);
    description = decodeURI(description);
    dispatchValue({action: SET_VALUES, newState: {
        elementID, description, page
    }});
  }, []);

  const handleSubmit = async () => {
    await handleFormSubmit({
      setIsLoading,
      formValues,
      dispatchError,
      setRedirect,
      sendRequestHandler: async ({description, elementID, page}) => {
        console.log(description, elementID, page);
        return {};
        // return await createPageHelper({description, elementID, page});
      }
    });
  };

  if (redirect) {
    // return <Redirect to={"/front/page-helpers"} />;
  }

  return <PageHelperForm
    pageHelper={formValues}
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    dispatchValue={dispatchValue}
    errors={errors}/>
}
