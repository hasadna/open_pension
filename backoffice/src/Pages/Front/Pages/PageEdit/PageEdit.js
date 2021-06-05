import {handleFormSubmit, PageForm} from "../PageForm";
import {useState, useReducer, useEffect} from 'react';
import {errorsReducer, SET_VALUES, valuesReducer} from "componenets/Form/formReducers";
import {Redirect, useParams} from "react-router-dom";
import {getPage, updatePage} from "api/page";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {label: ''});
  const {id} = useParams();

  useEffect(async () => {
    const {data: page} = await getPage(id);
    dispatchValue({action: SET_VALUES, newState: page});
  }, []);

  const handleSubmit = async () => {
    await handleFormSubmit({
      setIsLoading,
      formValues,
      dispatchError,
      setRedirect,
      sendRequestHandler: async ({label}) => {
        return await updatePage({label, id})
      }
    });
  };

  if (redirect) {
    return <Redirect to={"/front/pages"} />;
  }

  return <PageForm
    isEdit={true}
    page={formValues}
    isLoading={isLoading}
    handleSubmit={handleSubmit} dispatchValue={dispatchValue} errors={errors}/>
}
