import React, {useEffect, useState} from "react";
import './CustomTable.scss';
import {useTable} from "react-table";
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {TableFooter, TablePagination, TextField} from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import {PlayerMapper} from "../../home/players/Player";

const CustomTable = ({columns, allRows, searchField}: {columns: any, allRows: any, searchField: string}) => {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [displayedRows, setDisplayedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setDisplayedRows(filterRows(searchTerm, allRows, pageIndex, pageSize));
    }, []);

    const getCountBySearchTerm = () => {
        return allRows.filter((row: any) => String(row[searchField]).indexOf(searchTerm) >= 0).length;
    };

    const filterRows = (searchTerm: string, rows: [], pageIndex: number, pageSize: number) => {
        return rows.filter((row, index: number) => (String(row[searchField]).indexOf(searchTerm) >= 0))
            .filter((row, index: number) => !(index - (pageIndex * pageSize) >= pageSize || index < (pageIndex * pageSize)));
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPageIndex(newPage);
        setDisplayedRows(filterRows(searchTerm, allRows, newPage, pageSize));
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(Number(event.target.value));
        setDisplayedRows(filterRows(searchTerm, allRows, pageIndex, event.target.value));
    };

    const handleSearchChange = (event: any) => {
        setDisplayedRows(filterRows(event.target.value, allRows, pageIndex, pageSize));
        setSearchTerm(event.target.value);
    };

    const data = React.useMemo(
        () => {
            return displayedRows;
        },
        [displayedRows]
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
                            { label: 'All', value: allRows.length },
                        ]}
                        count={searchTerm !== "" ? getCountBySearchTerm() : allRows.length}
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

};

export default CustomTable;
