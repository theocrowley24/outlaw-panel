import React, {useEffect, useState} from "react";
import './PlayersTable';
import {useTable} from "react-table";
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {TableFooter, TablePagination, TextField} from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import {Player, PlayerMapper} from "../Player";
import {Link} from "react-router-dom";
import PlayersService from "../PlayersService";

const PlayersTable = () => {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [displayedPlayers, setDisplayedPlayers] = useState([new Player(null)]);
    const [players, setPlayers] = useState([new Player(null)]);

    let playersService = new PlayersService();

    const filterPlayers = (pageIndex: number, pageSize: number) => {
        return players.filter((player: Player, index: number) => !(index - (pageIndex * pageSize) >= pageSize || index < (pageIndex * pageSize)));
    };

    useEffect(() => {
        playersService.getAllPlayers().then((data: any) => {
            setPlayers(PlayerMapper.map(data.data));
        });

        setDisplayedPlayers(filterPlayers(pageIndex, pageSize));
    }, [players]);

    const handleChangePage = (event: any, newPage: any) => {
        setPageIndex(newPage);
        setDisplayedPlayers(filterPlayers(newPage, pageSize));
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(Number(event.target.value));
        setDisplayedPlayers(filterPlayers(pageIndex, event.target.value));
    };

    const handleSearchChange = (event: any) => {
        setDisplayedPlayers(players.filter((player: Player) => player.allNames.indexOf(event.target.value) >= 0));
    };

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
                            return (<Link to={{ pathname: `/home/players/edit_player/${cell.row.values.id}` }}>{cell.value}</Link>);
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
            return displayedPlayers;
        },
        [displayedPlayers]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return  <div className={"table-container"}>
            <TextField id="standard-basic" label="Search" onChange={handleSearchChange} />
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup, index) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell, index) => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: 'All', value: players.length },
                            ]}
                            count={players.length}
                            rowsPerPage={pageSize}
                            page={pageIndex}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </MaUTable>
        </div>

}

export default PlayersTable;
