/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import {Switch, withRouter} from "react-router-dom";
import EditUser from "./edit-user/EditUser";
import UsersTable from "./users-table/UsersTable";
import PrivateRoute from "../../../auth/PrivateRoute";
import {PermissionValue} from "../../../permissions/PermissionChecker";

const Users = () => {
    return (
        <Switch>
            <PrivateRoute path={"/home/admin/users/edit_user"} permission={PermissionValue.ViewUser}
                          component={EditUser}/>
            <PrivateRoute path={"/home/admin/users"} permission={PermissionValue.ViewUsers} component={UsersTable}/>
        </Switch>
    )
};

export default withRouter(Users);
