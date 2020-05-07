import {useEffect, useState} from "react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "./AuthService";
import PermissionChecker from "../permissions/PermissionChecker";
import PermissionService from "../services/PermissionsService";
import {PermissionMapper} from "../home/admin/Permission";
import Loading from "../loading/Loading";
import {useCookies} from "react-cookie";

// @ts-ignore
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
});


const PrivateRoute = ({ component: Component, permission, ...rest }: any) => {
    const [cookies, setCookie, removeCookie] = useCookies(['uid']);
    const [verified, setVerified] = useState({verified: false, loading: true});
    const [hasPermission, setHasPermission] = useState({hasPermission: false, loading: true});

    let authService = new AuthService();
    let permissionService = new PermissionService();

    useEffect(() => {
        // Verify with api
        authService.verify().then(verifiedData => {
            if (verifiedData.data) {
                setVerified({verified: verifiedData.data.verified, loading: false});
            } else {
                toast.error(verifiedData.message);
                setVerified({verified: false, loading: false});
            }
        });

        // Check permissions
        permissionService.userHasPermission(cookies['uid'], permission).then(permissionData => {
            if (permissionData.data) {
                setHasPermission({hasPermission: permissionData.data.hasPermission, loading: false});

                if (!permissionData.data.hasPermission) {
                    toast.error("You do not have permission to view this.");
                }
            } else {
                setHasPermission({hasPermission: false, loading: false});
            }
        });
    }, []);

    if (hasPermission.loading || verified.loading) {
        return <Loading />
    } else {
        return (
            <Route {...rest} render={(props: JSX.IntrinsicAttributes) => (
                hasPermission.hasPermission && verified.verified
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        );
    }
};

export default PrivateRoute;
