import {useRecoilValue} from "recoil";
import {authState} from "../state/authState.js"
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import Home from "./Home/Home";
import Users from "./Users/Users";
import UsersAdd from "./UsersAdd/UsersAdd";
import Login from "../componenets/Login/Login";
import FilesAdd from "./FilesAdd/FilesAdd";
import Files from "./Files/Files";

export default () => {
  const {token: tokenFromState} = useRecoilValue(authState);
  const tokenFromStorage = localStorage.getItem('token');
  const isAuth = tokenFromState || tokenFromStorage;
  // todo: use gurards routes.
  return <Router>
    <Switch>
      {isAuth ? <>
        <Route exact path="/"><Home /></Route>

        <Route exact path="/users"><Users /></Route>
        <Route exact path="/users/add"><UsersAdd /></Route>

        <Route exact path="/files"><Files /></Route>
        <Route exact path="/files/add"><FilesAdd /></Route>

      </> : <Route path="/"><Login /></Route>}
    </Switch>
  </Router>
};
