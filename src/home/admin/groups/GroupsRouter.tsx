/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import {PermissionValue} from "../../../permissions/PermissionChecker";
import Groups from "./Groups";
import PrivateRoute from "../../../auth/PrivateRoute";
import React from "react";

const GroupsRouter = () => {
    return <PrivateRoute path="/home/admin/groups" permission={PermissionValue.ViewRanks} component={Groups}/>;
};

export default GroupsRouter;
