import {useEffect, useState} from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";
import PermissionChecker from "../permissions/PermissionChecker";
import PermissionService from "../services/PermissionsService";
import {PermissionMapper} from "../home/admin/Permission";
import Loading from "../loading/Loading";

const PrivateRoute = ({ component: Component, permission,...rest }: any) => {
    const [state, setState] = useState({loggingIn: false, flag: false, hasPermission: false, authVerified: false});

    let authService = new AuthService();
    let permissionService = new PermissionService();

    useEffect(() => {
        let uid = localStorage.getItem("uid"); // TODO Replace local storage with a cookie

        if (!uid) {
            setState({loggingIn: true, flag: false, hasPermission: false, authVerified: false});
        }

        authService.verify().then((authData: any) => {
            if (uid) {
                permissionService.getUsersRank(parseInt(uid)).then((data: any) => {
                    permissionService.getAllPermissionsWithRank(data.data).then((data: any) => {
                        let temp = PermissionMapper.map(data.data);
                        console.log(authData);
                        setState({loggingIn: false, flag: true, hasPermission: PermissionChecker.hasPermission(permission, temp), authVerified: authData.data});
                    });
                });
            } else {
                setState({loggingIn: false, flag: true, hasPermission: false, authVerified: false});
                console.log("No UID");
            }
        });

    }, [permission]);

    if (!state.flag && !state.loggingIn) {
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
