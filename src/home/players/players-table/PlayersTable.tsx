/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import './PlayersTable.scss';
import {Player, PlayerMapper} from "../Player";
import PlayersService from "../PlayersService";
import CustomTable from "../../../shared/custom-table/CustomTable";

const PlayersTable = (props: any) => {
    const [players, setPlayers] = useState([new Player(null)]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Players',
                columns: [
                    {
                        Header: 'id',
                        accessor: 'id'
                    },
                    {
                        Header: 'uid',
                        accessor: 'uid'
                    },
                    {
                        Header: 'All names',
                        accessor: 'allNames',
                        Cell: (cell: any) => {
                            return (<div className={"player-name"}
                                         onClick={() => props.history.push(`/home/players/edit_player?id=${cell.row.values.id}`)}>
                                <p>{cell.value}</p>
                            </div>);
                        }
                    },
                    {
                        Header: 'Last name',
                        accessor: 'lastName'
                    },
                    {
                        Header: 'Cash',
                        accessor: 'cash'
                    },
                    {
                        Header: 'Bank',
                        accessor: 'bank'
                    },
                    {
                        Header: 'Dirty',
                        accessor: 'dirty'
                    },
                    {
                        Header: 'XP',
                        accessor: 'xp'
                    },
                    {
                        Header: 'Level',
                        accessor: 'level'
                    },
                    {
                        Header: 'NATO rank',
                        accessor: 'natoRank'
                    },
                    {
                        Header: 'RC rank',
                        accessor: 'rcRank'
                    },
                    {
                        Header: 'Admin level',
                        accessor: 'adminLevel'
                    },
                    {
                        Header: 'Alive',
                        accessor: 'alive'
                    }
                ]
            }
        ],
        [],
    );

    const data = React.useMemo(
        () => {
            return players;
        },
        [players]
    );

    let playersService = new PlayersService();

    useEffect(() => {
        playersService.getAllPlayers().then((data: any) => {
            setPlayers(PlayerMapper.map(data.data));

        });
    }, []);

    return <div className={"table-wrapper"}>
        <CustomTable columns={columns} allRows={data} searchField={"allNames"}/>
    </div>

};

export default PlayersTable;
