import {useState, useReducer} from 'react';
import {isEmpty} from 'lodash';
import {Redirect} from "react-router-dom";

import {validation} from './submitHandle';
import Page from "componenets/Page/Page";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Copy, Home, Upload} from "Icons/Icons";
import {ADD_ERROR, errorsReducer, valuesReducer} from "componenets/Form/formReducers";
import {createUser} from "api/user";
import UserForm from "Pages/User/UserForm";

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errors, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {nameToPresent: ''});

  const handleSubmit = async () => {
    const isFormValid = validation({dispatchError, formValues});

    if (isFormValid) {
      setIsLoading(true);

      const {error} = await createUser(formValues);

      if (!isEmpty(error)) {
        Object.entries(error.fields).forEach(([field, error]) => {
          dispatchError({ type: ADD_ERROR, error: {[field]: error}});
        });
      }
      else {
        setRedirect(true);
      }

      setIsLoading(false);
    }
  };

  if (redirect) {
    return <Redirect to={"/users"} />;
  }

  return <Page
    title={"Adding user"}
    activePage="users"
    notch="small"
    topContent={<Breadcrumbs crumbs={[
      <Crumb title={'Home'} icon={<Home />} />,
      <Crumb title={'Users'} icon={<Copy />} />,
      <Crumb title={'Adding user'} icon={<Upload />} />
    ]} />}
  >
    <UserForm user={formValues} isLoading={isLoading} handleSubmit={handleSubmit} dispatchValue={dispatchValue} errors={errors}/>
  </Page>
}
