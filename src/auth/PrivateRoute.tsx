import {Component, useEffect, useState} from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";
import PermissionChecker from "../permissions/PermissionChecker";
import PermissionService from "../services/PermissionsService";
import {PermissionMapper} from "../home/admin/Permission";
import Loading from "../loading/Loading";

const PrivateRoute = ({ component: Component, permission,...rest }: any) => {
    const [state, setState] = useState({flag: false, hasPermission: false, authVerified: false});

    let authService = new AuthService();
    let permissionService = new PermissionService();

    useEffect(() => {
        let uid = localStorage.getItem("uid");

        authService.verify().then((authData: any) => {
            console.log(authData);

            if (uid) {
                permissionService.getUsersRank(parseInt(uid)).then((data: any) => {
                    permissionService.getAllPermissionsWithRank(data.data).then((data: any) => {
                        let temp = PermissionMapper.map(data.data);
                        setState({flag: true, hasPermission: PermissionChecker.hasPermission(permission, temp), authVerified: authData});
                    });
                });
            } else {
                setState({flag: true, hasPermission: false, authVerified: false});
            }
        });

    }, [permission]);

    if (!state.flag) {
        return <Loading />
    } else {
        return (
            <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
                authService.isLoggedIn() && state.hasPermission && state.authVerified
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        );
    }
}

export default PrivateRoute;
