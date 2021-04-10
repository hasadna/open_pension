import Page from "componenets/Page/Page";
import UserForm from "Pages/User/UserForm";
import {useReducer, useState, useEffect} from "react";
import {ADD_ERROR, errorsReducer, SET_VALUES, valuesReducer} from "componenets/Form/formReducers";
import {getUser, updateUser} from "api/user";
import {Redirect, useParams} from "react-router-dom";
import {validation} from "../UserAdd/submitHandle";
import {isEmpty} from "lodash";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {nameToPresent: ''});
  const {id} = useParams();

  const handleSubmit = async () => {
    const isFormValid = validation({dispatchError, formValues, passwordRequired: false});

    if (isFormValid) {
      setIsLoading(true);

      const {error} = await updateUser(id, formValues);

      if (!isEmpty(error)) {
        Object.entries(error.fields).forEach(([field, {message}]) => {
          dispatchError({ type: ADD_ERROR, error: {[field]: message}});
        });
      }
      else {
        setRedirect(true);
      }

      setIsLoading(false);
    }
  };

  useEffect(async () => {
    const {data: user} = await getUser(id);
    dispatchValue({action: SET_VALUES, newState: user.user});
  }, []);

  if (redirect) {
    return <Redirect to={"/users"} />;
  }

  return <Page activePage="users" notch="small">
    <UserForm
      user={formValues}
      isEdit={true}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      dispatchValue={dispatchValue}
      errors={errors} />
  </Page>
}
