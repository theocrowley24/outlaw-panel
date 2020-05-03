import React, {useEffect, useState} from "react";
import {useTable} from "react-table";
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {TableFooter, TablePagination} from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

const PlayersTable = ({players}: any) => {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);

    const gotoPage = (page: any) => {

    };

    const handleChangePage = (event: any, newPage: any) => {
        setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(Number(event.target.value));
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

    return  <MaUTable {...getTableProps()}>
        <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableHead>
        <TableBody>
            {rows.map((row, i) => {
                if (i - (pageIndex * pageSize) >= pageSize || i < (pageIndex * pageSize)) return null;

                prepareRow(row);
                return (
                    <TableRow {...row.getRowProps()}>
                        {row.cells.map(cell => {
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
                        { label: 'All', value: data.length },
                    ]}
                    count={data.length}
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
}

export default PlayersTable;
