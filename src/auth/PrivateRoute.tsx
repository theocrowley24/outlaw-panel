import { Component } from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    let authService = new AuthService();

    return (
        <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
            authService.isLoggedIn()
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    );    
}

export default PrivateRoute;