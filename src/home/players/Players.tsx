import React from "react";
import PlayersTable from "./players-table/PlayersTable";
import PrivateRoute from "../../auth/PrivateRoute";
import {PermissionValue} from "../../permissions/PermissionChecker";
import {BrowserRouter, Switch, withRouter} from "react-router-dom";
import EditPlayer from "./edit-player/EditPlayer";
import TableBody from "@material-ui/core/TableBody";

const Players = () => {
    return (
            <Switch>
                <PrivateRoute path={"/home/players/edit_player"} permission={PermissionValue.ViewPlayer} component={EditPlayer} />
                <PrivateRoute path={"/home/players"} permission={PermissionValue.ViewPlayers} component={PlayersTable} />
            </Switch>
    )
};

export default withRouter(Players);
