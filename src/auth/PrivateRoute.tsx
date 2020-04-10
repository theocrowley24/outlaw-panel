import {Component, useEffect, useState} from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";
import PermissionChecker from "../permissions/PermissionChecker";
import PermissionService from "../permissions/PermissionsService";
import {PermissionMapper} from "../home/admin/Permission";

const PrivateRoute = ({ component: Component, permission,...rest }: any) => {
    //const [flag, setFlag] = useState(false);
    //const [hasPermission, setHasPermission] = useState(false);

    const [state, setState] = useState({flag: false, hasPermission: false});

    let authService = new AuthService();
    let permissionService = new PermissionService();

    console.log("Permissions loaded? " + state.flag);
    console.log("User has permission to view this: " + state.hasPermission);

    useEffect(() => {
        permissionService.getAllPermissionsWithRank(11).then((data: any) => {
            let temp = PermissionMapper.map(data.data);
            console.log(temp);
            //setHasPermission(PermissionChecker.hasPermission(permission, temp));
            //setFlag(true);

            setState({flag: true, hasPermission: PermissionChecker.hasPermission(permission, temp)});

        });

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

    /*
    return (
        <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
            authService.isLoggedIn() && hasPermission
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    );
     */
}

export default PrivateRoute;
