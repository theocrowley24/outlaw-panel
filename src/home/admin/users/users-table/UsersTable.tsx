/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import './UsersTable.scss';
import {UsersService} from "../UsersService";
import {User, UserMapper} from "../../../../auth/User";
import CustomTable from "../../../../shared/custom-table/CustomTable";
import {Button, Dialog, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import PermissionService from "../../groups/PermissionsService";
import {UserGroup, UserGroupMapper} from "../../groups/UserGroup";

// @ts-ignore
import ToastServive from 'react-material-toast';
import {PermissionValue} from "../../../../permissions/PermissionChecker";

const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

const UsersTable = (props: any) => {
    const [users, setUsers] = useState([new User(null)]);
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rankId, setRankId] = useState(1);

    const [userGroups, setUserGroups]  = useState([new UserGroup(null)]);

    const [hasPermission, setHasPermission] = useState(false);

    let usersService = new UsersService();
    let permissionsService = new PermissionService();

    useEffect(() => {
        usersService.getAllUsers().then(response => {
            setUsers(UserMapper.map(response.data));
        });

        permissionsService.getAllRanks().then(response => {
           setUserGroups(UserGroupMapper.map(response.data));
        });

        permissionsService.doIHavePermission(PermissionValue.CreateUser).then(response => {
           setHasPermission(response.data);
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
                            return (<div className={"user-name"}
                                         onClick={() => props.history.push(`/home/admin/users/edit_user?id=${cell.row.values.id}`)}>
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

    const handleCreateUserOnClick = () => {
        setNewUserDialogOpen(true);
    };

    const handleUsernameOnChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordOnChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleRankIdOnChange = (event: any) => {
        setRankId(event.target.value);
    };

    const selectOptions = () => {
        let view: any[] = [];

        for (let i = 0; i < userGroups.length; i++) {
            view.push(<MenuItem key={i} value={userGroups[i].id}>{userGroups[i].name}</MenuItem>);
        }

        return view;
    };

    const handleCreateUserConfirmOnClick = () => {
        usersService.createUser({username: username, password: password, rankId: rankId}).then(response => {
            if (response && response.message) {
                toast.info(response.message);
            } else {
                toast.error("Unknown error.");
            }
        });
    };

    const createUserButtonWrapper = () => {
      if (hasPermission) {
          return <div className={"create-user-button"}>
              <Button variant="contained" color="primary" onClick={handleCreateUserOnClick}>
                  Create user
              </Button>
          </div>
      } else {
          return <div />
      }
    };

    return <div>
        <Dialog open={newUserDialogOpen} onClose={() => setNewUserDialogOpen(false)} >
            <DialogTitle>Create user</DialogTitle>
            <DialogContent>
                <div className={"new-user-dialog"}>
                    <div className={"input-wrapper"}>
                        <TextField autoComplete='off' label={"Username"} onChange={handleUsernameOnChange} value={username}/>
                    </div>
                    <div className={"input-wrapper"}>
                        <TextField autoComplete='off' label={"Password"} type={"password"} onChange={handlePasswordOnChange} value={password}/>
                    </div>
                    <div className={"input-wrapper"}>
                        <InputLabel id="select-label">User group</InputLabel>
                        <Select labelId="select-label" label={"User group"} onChange={handleRankIdOnChange} value={rankId}>
                            {selectOptions()}
                        </Select>
                    </div>

                    <div className={"input-wrapper"}>
                        <Button variant="contained" color="primary" onClick={handleCreateUserConfirmOnClick}>
                            Create user
                        </Button>
                    </div>
                </div>
            </DialogContent>


        </Dialog>

        {createUserButtonWrapper()}

        <CustomTable columns={columns} allRows={data} searchField={"username"}/>
    </div>
};

export default UsersTable;
