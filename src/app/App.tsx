import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../login/Login';
import Dashboard from '../home/Dashboard';
import {PermissionValue} from "../permissions/PermissionChecker";
import Logout from "../logout/Logout";

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <PrivateRoute path="/home" permission={PermissionValue.Dashboard} component={Dashboard} />
    </Router>
  );
}

export default App;
