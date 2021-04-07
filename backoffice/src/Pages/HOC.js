import {useRecoilValue} from "recoil";
import {authState} from "../state/authState.js"
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "./Home/Home";
import Login from "../componenets/Login/Login";

import {filesPages} from './File'
import {userPages} from './User';

export default () => {
  const {token: tokenFromState} = useRecoilValue(authState);
  const tokenFromStorage = localStorage.getItem('token');
  const isAuth = tokenFromState || tokenFromStorage;

  const {FilesAdd, FilesList} = filesPages;
  const {UsersList, UserAdd, UserDelete, UserEdit} = userPages;


  // todo: use gurards routes.
  return <Router>
    <Switch>
      {isAuth ? <>
        <Route exact path="/"><Home /></Route>

        <Route exact path="/users"><UsersList /></Route>
        <Route exact path="/user/add"><UserAdd /></Route>
        <Route exact path="/user/:id/edit"><UserEdit /></Route>
        <Route exact path="/user/:id/delete"><UserDelete /></Route>

        <Route exact path="/files">{FilesList}</Route>
        <Route exact path="/files/add"><FilesAdd /></Route>

      </> : <Route path="/"><Login /></Route>}
    </Switch>
  </Router>
};
