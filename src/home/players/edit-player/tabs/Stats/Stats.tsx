/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import "./Stats.scss";
import {Button, TextField} from "@material-ui/core";
import {Player} from "../../../Player";
import PlayersService from "../../../PlayersService";
import PermissionService from "../../../../admin/groups/PermissionsService";
import {PermissionValue} from "../../../../../permissions/PermissionChecker";
import Loading from "../../../../../loading/Loading";
// @ts-ignore
import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

interface IDictionary {
    [index: string]: string;
}

const Stats = ({player}: { player: Player }) => {
    const [updatedStats, setUpdatedStats] = useState({} as IDictionary);
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(true);

    let playersService = new PlayersService();
    let permissionService = new PermissionService();

    const handleInputChange = (event: any) => {
        let newStats = updatedStats;
        newStats[event.target.id] = event.target.value;
        setUpdatedStats(newStats);
        player[event.target.id] = event.target.value;
    };

    const handleUpdateButton = () => {
        playersService.updatePlayer(player.id, updatedStats).then((response) => {
            toast.success("Updated player successfully");
        });
    };

    useEffect(() => {
        permissionService.userHasPermission(Number(localStorage.getItem("uid")), PermissionValue.UpdatePlayer).then(data => {
            setHasPermission(data.data.hasPermission);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading/>
    }

    if (!hasPermission) {
        return <div className={"stats-container"}>
            You do not have permission to edit players
        </div>
    }

    return <div className={"stats-container"}>
        <form>
            <div className={"input-wrapper"}>
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="ID"
                    defaultValue={player.id || 0}/>
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="UID"
                    defaultValue={player.uid || 0}/>
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="All names"
                    defaultValue={player.allNames || ""}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="lastName"
                    label="Last name"
                    defaultValue={player.lastName || ""}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    type={"number"}
                    id="cash"
                    label="Cash"
                    defaultValue={player.cash || 0}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    type={"number"}
                    id="bank"
                    label="Bank"
                    defaultValue={player.bank || 0}/>
                <TextField
                    className={"player-stat"}
                    type={"number"}
                    id="standard-basic"
                    label="Dirty"
                    defaultValue={player.dirty || 0}/>
                <TextField
                    className={"player-stat"}
                    type={"number"}
                    id="standard-basic"
                    label="XP"
                    defaultValue={player.xp || 0}/>
                <TextField
                    className={"player-stat"}
                    type={"number"}
                    id="standard-basic"
                    label="Level"
                    defaultValue={player.level || 0}/>
                <TextField
                    className={"player-stat"}
                    multiline
                    rows={4}
                    disabled
                    id="standard-basic"
                    label="Talents"
                    defaultValue={player.talents || ""}/>
                <TextField
                    className={"player-stat"}
                    multiline
                    rows={4}
                    disabled
                    id="standard-basic"
                    label="My Transactions"
                    defaultValue={player.myTransactions || ""}/>
                <TextField
                    className={"player-stat"}
                    multiline
                    rows={4}
                    disabled
                    id="standard-basic"
                    label="Gear"
                    defaultValue={player.gear || ""}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    type={"number"}
                    id="natoRank"
                    label="NATO Rank"
                    defaultValue={player.natoRank || 0}/>
                <TextField
                    className={"player-stat"}
                    type={"number"}
                    id="standard-basic"
                    label="RC Rank"
                    defaultValue={player.rcRank || 0}/>
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="Jailed"
                    defaultValue={player.jailed || ""}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    type={"number"}
                    id="alive"
                    label="Alive"
                    defaultValue={player.alive || 1}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    type={"number"}
                    id="adminLevel"
                    label="Admin level"
                    defaultValue={player.adminLevel || 0}/>
            </div>

            <div className={"update-button"}>
                <Button variant="contained" color="primary" onClick={handleUpdateButton}>
                    Update
                </Button>
            </div>
        </form>
    </div>
};

export default Stats;
