/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import PrivateRoute from "../../auth/PrivateRoute";
import {PermissionValue} from "../../permissions/PermissionChecker";
import {Switch, withRouter} from "react-router-dom";
import EditVehicle from "./edit-vehicle/EditVehicle";
import VehiclesTable from "./vehicles-table/VehiclesTable";

const Players = () => {
    return (
        <Switch>
            <PrivateRoute path={"/home/vehicles/edit_vehicle"} permission={PermissionValue.ViewPlayer}
                          component={EditVehicle}/>
            <PrivateRoute path={"/home/vehicles"} permission={PermissionValue.ViewPlayers} component={VehiclesTable}/>
        </Switch>
    )
};

export default withRouter(Players);
