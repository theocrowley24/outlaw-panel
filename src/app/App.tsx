import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../login/Login';
import Dashboard from '../home/Dashboard';
import {PermissionValue} from "../permissions/PermissionChecker";
import Logout from "../logout/Logout";
import RootRedirect from "./RootRedirect";

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/home" permission={PermissionValue.Dashboard} component={Dashboard} />
            <Route path={"/"} component={RootRedirect}/>
        </Switch>
    </Router>
  );
}

export default App;
