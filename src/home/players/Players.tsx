import React, {useEffect, useState} from "react";
import PlayersService from "./PlayersService";
import {Player, PlayerMapper} from "./Player";
import PlayersTable from "./players-table/PlayersTable";

const Players = () => {
    const [players, setPlayers] = useState([new Player(null)]);

    let playersService = new PlayersService();

    useEffect(() => {
        playersService.getAllPlayers().then((data: any) => {
           setPlayers(PlayerMapper.map(data.data));
        });
    }, []);

    return (
        <div>
            <PlayersTable players={players}/>
        </div>
    )
}

export default Players;
