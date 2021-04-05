import {useState, useReducer} from 'react';
import Page from "../../componenets/Page/Page";
import {Breadcrumbs, Crumb} from "../../componenets/Breadcrumns/Breadcrumbs";
import {Copy, Home, Upload} from "../../Icons/Icons";
import {Button, Form, Input, Section} from "../../componenets/Form/Form";
import {errorsReducer, valuesReducer} from "../../componenets/Form/formReducers";
import {validation} from './submitHandle';

export default () => {

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [{usernameError, emailError, passwordError, rePasswordError}, dispatchError] = useReducer(errorsReducer, {});
  const [formValues, dispatchValue] = useReducer(valuesReducer, {});

  const handleSubmit = async () => {
    validation({dispatchError, formValues});
  };

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
    <Form
      title={"Adding user"}
      actions={<Button type="ok" waiting={isLoading} onClick={() => handleSubmit()}>Submit</Button>}>
      <Section title="Login details">
        <Input title={"Username"} onChange={(element) => dispatchValue({element, name: 'username'})} error={usernameError} />
        <Input title={"Email"} onChange={(element) => dispatchValue({element, name: 'email'})} error={emailError} />
      </Section>

      <Section title="Passwords">
        <Input type="password" title={"Password"} onChange={(element) => dispatchValue({element, name: 'password'})} error={passwordError} />
        <Input type="password" title={"Password - verification"} onChange={(element) => dispatchValue({element, name: 'rePassword'})} error={rePasswordError} />
      </Section>

      <Section title="Personal details">
        <Input title={"Name to present"} onChange={(element) => dispatchValue({element, name: 'nameToPresent'})} />
      </Section>
    </Form>
  </Page>
}
