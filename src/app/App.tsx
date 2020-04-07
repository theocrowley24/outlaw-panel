import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../login/Login';
import Dashboard from '../home/Dashboard';

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/home" component={Dashboard} />
    </Router>
  );
}

export default App;
