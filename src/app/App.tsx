import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../login/Login';
import Home from '../home/Home';

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/home" component={Home} />
    </Router>
  );
}

export default App;
