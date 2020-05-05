import React from "react";
import PlayersTable from "./players-table/PlayersTable";
import PrivateRoute from "../../auth/PrivateRoute";
import {PermissionValue} from "../../permissions/PermissionChecker";
import { Switch } from "react-router-dom";
import EditPlayer from "./edit-player/EditPlayer";

const Players = () => {
    return (
        <Switch>
            <PrivateRoute path={"/home/players"} permission={PermissionValue.ViewPlayers} component={PlayersTable} />
            <PrivateRoute path={"/home/players/edit_player"} permission={PermissionValue.ViewPlayer} component={EditPlayer} />
        </Switch>
    )
};

export default Players;
