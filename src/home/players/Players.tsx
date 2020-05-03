import React, {useEffect, useState} from "react";
import PlayersService from "./PlayersService";
import {Player, PlayerMapper} from "./Player";
import {useTable} from "react-table";

const Players = () => {
    const [players, setPlayers] = useState([new Player(null)]);

    let playersService = new PlayersService();

    useEffect(() => {
        playersService.getAllPlayers().then((data: any) => {
           setPlayers(PlayerMapper.map(data.data));
        });
    }, []);

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
                        accessor: 'allNames'
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
            return players;
        },
        [players]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Players;
