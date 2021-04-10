import {Button, Form, Input, Section} from "componenets/Form/Form";

export default ({isEdit = false, isLoading, handleSubmit, dispatchValue, errors, user = {}}) => {
  const {usernameError, emailError, passwordError, rePasswordError} = errors;
  const {username, email, nameToPresent} = {
    ...{username: '', email: '', nameToPresent: ''},
    ...user
  };

  console.log(errors);

  return <Form
    title={isEdit ? "Editing user" : "Adding user"}
    actions={<Button type="ok" waiting={isLoading} onClick={() => handleSubmit()}>Submit</Button>}>
    <Section title="Login details">
      <Input value={username} title={"Username"} onChange={(element) => dispatchValue({element, name: 'username'})}  error={usernameError} />
      <Input value={email} title={"Email"} onChange={(element) => dispatchValue({element, name: 'email'})} error={emailError} />
    </Section>

    <Section title="Passwords">
      <Input type="password" title={"Password"} onChange={(element) => dispatchValue({element, name: 'password'})} error={passwordError} />
      <Input type="password" title={"Password - verification"} onChange={(element) => dispatchValue({element, name: 'rePassword'})} error={rePasswordError} />
    </Section>

    <Section title="Personal details">
      <Input value={nameToPresent} title={"Name to present"} onChange={(element) => dispatchValue({element, name: 'nameToPresent'})} />
    </Section>
  </Form>;
}
