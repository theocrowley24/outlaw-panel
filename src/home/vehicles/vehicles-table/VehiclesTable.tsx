import React, {useEffect, useState} from "react";
import CustomTable from "../../../shared/custom-table/CustomTable";
import {Player, PlayerMapper} from "../../players/Player";
import PlayersService from "../../players/PlayersService";

const VehiclesTable = (props: any) => {
    const [vehicles, setVehicles] = useState([new Player(null)]);

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
                        Header: 'All names',
                        accessor: 'allNames',
                        Cell: (cell: any) => {
                            return (<div className={"player-name"} onClick={() => props.history.push(`/home/players/edit_player?id=${cell.row.values.id}`)} >
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
                        Header: 'Profession',
                        accessor: 'profession'
                    },
                    {
                        Header: 'Gear',
                        accessor: 'gear'
                    },
                    {
                        Header: 'Licenses',
                        accessor: 'licenses'
                    },
                    {
                        Header: 'NATO rank',
                        accessor: 'natoRank'
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
            return vehicles;
        },
        [vehicles]
    );

    console.log(data)

    let playersService = new PlayersService();

    useEffect(() => {
        playersService.getAllPlayers().then((data: any) => {
            setVehicles(PlayerMapper.map(data.data));
        });
    }, []);

    return <div>
        <CustomTable key={data.length} columns={columns} allRows={data} searchField={"allNames"} />
    </div>
};

export default VehiclesTable;
