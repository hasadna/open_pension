import {useState} from 'react';
import './Login.scss';
import {Redirect} from "react-router-dom";
import {Input} from "componenets/Form/Form";
import {isEmpty} from "lodash";
import {useSetRecoilState} from "recoil";
import {authState} from "state/authState";
import {loginQuery} from "api/user";

const login = async ({usernameOrEmail, password}) => {
  const key = usernameOrEmail.includes('@') ? 'email' : 'username';
  const loginPayload = {
    password,
    [key]: usernameOrEmail
  };
  return loginQuery(loginPayload);
}

const validateForm = ({usernameOrEmail, password, setErrors}) => {
  if (isEmpty(usernameOrEmail) || isEmpty(password)) {
    const errors = {};

    if (isEmpty(usernameOrEmail)) {
      errors['usernameOrEmailError'] = 'You need to set a username or email';
    }

    if (isEmpty(password)) {
      errors['passwordError'] = 'Password cannot be empty';
    }

    setErrors(errors);
    return false;
  }

  return true;
}

export default () => {
  // todo: refactor to use the form reducers.
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [error, setError] = useState('');
  const setAuthState = useSetRecoilState(authState);

  if (redirectToHome) {
    return <Redirect to={"/home"} />
  }

  const handleClick = async () => {
    // Reset the loading status.
    setIsLoading(false);
    setError('');
    setErrors({});

    const isFormValid = validateForm({usernameOrEmail, password, setErrors});
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    const {data, error} = await login({usernameOrEmail, password});

    if (!isEmpty(error)) {
      setError(error.message);
    } else {
      const {token, refreshToken, expires} = data;

      localStorage.setItem('token', token);
      localStorage.setItem('expires', expires);
      localStorage.setItem('refreshToken', refreshToken);
      setAuthState(oldAuth => {
        return {
          ...oldAuth,
          token,
          expires,
        };
      });
      window.location.reload();
    }

    setIsLoading(false);
  }

  const { usernameOrEmailError, passwordError } = errors;
  return <div className="login-wrapper">
    <section className="umbre-background">
      <h1 className="h1">Welcome to Open Pension Dashboard</h1>
      <p className="p">
        This is the dashboard for managing Open Pension - If you don't have an account then get out!
      </p>
    </section>

    <section className="login">
      <small className="title">Login</small>

      {error && <div className="message error">{error}</div>}

      <div className="inputs">
        <Input title={"Email or Username"} type="text" id="username" className="email" placeholder="Enter email or username" onChange={(e) => {setUsernameOrEmail(e.target.value)}} error={usernameOrEmailError} />
        <Input title={"Password"} type="password" id="password" className="password"  placeholder="Enter password" onChange={(e) => {setPassword(e.target.value)}} error={passwordError} />
      </div>

      <button className={`button button-ok ${isLoading ? 'on-click':''}`} onClick={() => handleClick()}>Login</button>
    </section>
  </div>
};
