import {useRecoilValue, useResetRecoilState} from "recoil";
import {authState, loggedInUserState} from "state/authState";
import {useState} from 'react';

export default () => {

  const resetUser = useResetRecoilState(authState);
  const user = useRecoilValue(loggedInUserState);
  const [logout, setLogout] = useState(false);

  if (!user || logout) {
    resetUser();
    localStorage.removeItem('token');
  }

  return <>{user.nameToPresent || user.username}. <a href={"#"} onClick={(e) => {setLogout(true);}}>Logout</a></>
};
