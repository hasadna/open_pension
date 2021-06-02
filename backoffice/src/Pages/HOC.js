import {useRecoilValue} from "recoil";
import {authState} from "state/authState.js"
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "./Home/Home";
import Login from "componenets/Login/Login";

import {filePages} from './File'
import {userPages} from './User';
import ServicesAndAnalytics from "./ServicesAndAnalytics/ServicesAndAnalytics";
import {frontPagesPages} from "./Front/Pages";
import {PageHelpers} from "./Front/PageHelpers";

export default () => {
  const {token: tokenFromState} = useRecoilValue(authState);
  const tokenFromStorage = localStorage.getItem('token');
  const isAuth = tokenFromState || tokenFromStorage;

  const {FilesList, FileAdd} = filePages;
  const {UsersList, UserAdd, UserDelete, UserEdit} = userPages;
  const {PagesList, PageAdd, PageEdit, PageDelete} = frontPagesPages;
  const {PageHelpersList, DeletePageHelper, AddPageHelper, EditPageHelper} = PageHelpers;

  // todo: use gurards routes.
  return <Router>
    <Switch>
      {isAuth ? <>
        <Route exact path="/"><Home /></Route>

        <Route exact path="/users"><UsersList /></Route>
        <Route exact path="/user/add"><UserAdd /></Route>
        <Route exact path="/user/:id/edit"><UserEdit /></Route>
        <Route exact path="/user/:id/delete"><UserDelete /></Route>

        <Route exact path="/services-and-analytics"><ServicesAndAnalytics /></Route>

        <Route exact path="/files"><FilesList /></Route>
        <Route exact path="/file/add"><FileAdd /></Route>

        <Route exact path="/front/pages"><PagesList /></Route>
        <Route exact path="/front/page/add"><PageAdd /></Route>
        <Route exact path="/front/page/:id/edit"><PageEdit /></Route>
        <Route exact path="/front/page/:id/delete"><PageDelete /></Route>

        <Route exact path="/front/page-helpers"><PageHelpersList /></Route>
        <Route exact path="/front/page-helpers/add"><AddPageHelper /></Route>
        <Route exact path="/front/page-helpers/:id/edit"><EditPageHelper /></Route>
        <Route exact path="/front/page-helpers/:id/delete"><DeletePageHelper /></Route>

      </> : <Route path="/"><Login /></Route>}
    </Switch>
  </Router>
};
