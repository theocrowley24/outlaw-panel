import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../login/Login';
import Dashboard from '../home/Dashboard';
import {PermissionValue} from "../permissions/PermissionChecker";

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/home" permission={PermissionValue.Dashboard} component={Dashboard} />
    </Router>
  );
}

export default App;
