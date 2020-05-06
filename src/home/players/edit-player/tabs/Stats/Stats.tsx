import React, {useState} from "react";
import "./Stats.scss";
import {Button, TextField} from "@material-ui/core";
import {Player} from "../../../Player";

interface IDictionary {
    [index: string]: string;
}

const Stats = ({player}: {player: Player}) => {
    const [updatedStats, setUpdatedStats] = useState({} as IDictionary);

    const handleInputChange = (event: any) => {
        let newStats = updatedStats;
        newStats[event.target.id] = event.target.value;
        setUpdatedStats(newStats);
        //console.log(event.target.id)
        player[event.target.id] = event.target.value;
    };

    const handleUpdateButton = () => {
        console.log(updatedStats);
    };

    return <div className={"stats-container"}>
        <form>
            <div className={"input-wrapper"}>
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="ID"
                    defaultValue={player.id || ""} />
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="All names"
                    defaultValue={player.allNames || ""} />
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="lastName"
                    label="Last name"
                    defaultValue={player.lastName || ""} />
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    type={"number"}
                    id="cash"
                    label="Cash"
                    defaultValue={player.cash || ""}/>
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="bank"
                    label="Bank"
                    defaultValue={player.bank || ""} />
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="profession"
                    label="Profession"
                    defaultValue={player.profession || ""} />
                <TextField
                    className={"player-stat"}
                    disabled
                    id="standard-basic"
                    label="Gear"
                    defaultValue={player.gear || ""} />
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="natoRank"
                    label="NATO Rank"
                    defaultValue={player.natoRank || ""} />
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="alive"
                    label="Alive"
                    defaultValue={player.alive || ""} />
                <TextField
                    className={"player-stat"}
                    onChange={handleInputChange}
                    id="adminLevel"
                    label="Admin level"
                    defaultValue={player.adminLevel || ""} />
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
