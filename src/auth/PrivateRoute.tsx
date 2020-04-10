import { Component } from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";
import PermissionChecker from "../permissions/PermissionChecker";
import PermissionService from "../permissions/PermissionsService";
import {Permission, PermissionMapper} from "../home/admin/Permission";

const PrivateRoute = ({ component: Component, permission,...rest }: any) => {
    let authService = new AuthService();
    let permissionService = new PermissionService();
    let permissions: Permission[];

    /*
    permissionService.getAllPermissions().then((data: any) => {
        let temp = PermissionMapper.map(data.data);

        permissionService.getAllRankPermissions(0).then((data: any) => {
            let newAllPermissions = PermissionMapper.setOwnedPermissions(temp, data.data);
            console.log(newAllPermissions);
        });
    });

     */

    return (
        <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
            authService.isLoggedIn() && PermissionChecker.hasPermissions(permission, permissions)
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    );    
}

export default PrivateRoute;
