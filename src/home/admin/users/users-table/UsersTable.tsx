import React, {useEffect, useState} from "react";
import './UsersTable.scss';
import {UsersService} from "../UsersService";
import {User, UserMapper} from "../../../../auth/User";
import CustomTable from "../../../../shared/custom-table/CustomTable";

const UsersTable = (props: any) => {
    const [users, setUsers] = useState([new User(null)]);

    useEffect(() => {
        let usersService = new UsersService();
        usersService.getAllUsers().then(response => {
            setUsers(UserMapper.map(response.data));
        });
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Users',
                columns: [
                    {
                        Header: 'id',
                        accessor: 'id'
                    },
                    {
                        Header: 'Username',
                        accessor: 'username',
                        Cell: (cell: any) => {
                            return (<div className={"user-name"} onClick={() => props.history.push(`/home/admin/users/edit_user?id=${cell.row.values.id}`)} >
                                <p>{cell.value}</p>
                            </div>);
                        }
                    },
                    {
                        Header: 'Rank',
                        accessor: 'userGroup.name'
                    }
                ]
            }
        ],
        [],
    );

    const data = React.useMemo(
        () => {
            return users;
        },
        [users]
    );

    return <div>
        <CustomTable columns={columns} allRows={data} searchField={"username"} />
    </div>
};

export default UsersTable;
