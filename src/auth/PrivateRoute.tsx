import { Component } from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    return (
        <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
            true
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    );    
}

export default PrivateRoute;