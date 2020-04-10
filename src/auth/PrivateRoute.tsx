import {Component, useEffect, useState} from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";
import PermissionChecker from "../permissions/PermissionChecker";
import PermissionService from "../permissions/PermissionsService";
import {PermissionMapper} from "../home/admin/Permission";

const PrivateRoute = ({ component: Component, permission,...rest }: any) => {
    const [state, setState] = useState({flag: false, hasPermission: false});

    let authService = new AuthService();
    let permissionService = new PermissionService();

    useEffect(() => {
        let uid = localStorage.getItem("uid");

        if (uid) {
            permissionService.getUsersRank(parseInt(uid)).then((data: any) => {
                console.log(data.data);
                permissionService.getAllPermissionsWithRank(data.data).then((data: any) => {
                    let temp = PermissionMapper.map(data.data);
                    setState({flag: true, hasPermission: PermissionChecker.hasPermission(permission, temp)});
                });
            });
        } else {
         setState({flag: true, hasPermission: false});
        }
    }, [permission]);

    if (!state.flag) {
        return <div>Loading!</div>
    } else {
        return (
            <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
                authService.isLoggedIn() && state.hasPermission
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        );
    }
}

export default PrivateRoute;
