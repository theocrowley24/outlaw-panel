/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import './EditUser.scss';
import queryString from "query-string";
import {UsersService} from "../UsersService";
import {User} from "../../../../auth/User";
import {Button, FormControlLabel, InputLabel, MenuItem, Paper, Select, Switch, TextField} from "@material-ui/core";
import {UserGroup, UserGroupMapper} from "../../groups/UserGroup";
import PermissionService from "../../groups/PermissionsService";
// @ts-ignore
import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

const EditUser = (props: any) => {
    const [user, setUser] = useState(new User(null));
    const [userGroups, setUserGroups] = useState([new UserGroup(null)]);
    const [accountDeactivated, setAccountDeactivated] = useState(false);
    const [resetPassword, setResetPassword] = useState("");

    let userId: number = Number(queryString.parse(props.location.search).id);

    let usersService = new UsersService();
    let permissionsService = new PermissionService();

    useEffect(() => {
        usersService.getUserById(userId).then(response => {
            setUser(new User(response.data));
        });

        permissionsService.getAllRanks().then(response => {
            setUserGroups(UserGroupMapper.map(response.data));
        });

    }, []);

    const handleUserGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let userCopy = new User(user);
        userCopy.userGroup.id = Number(event.target.value);
        userCopy.userGroup.name = String(userGroups.filter((element: UserGroup) => element.id === Number(event.target.value))[0].name);

        setUser(userCopy);
    };

    const handleAccountDeactivationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountDeactivated(event.target.checked)
    };

    const handleResetPasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setResetPassword(String(event.target.value));
    };

    const handleUpdateUser = () => {
        let data = {
            "rank_id": user.userGroup.id,
            "reset_password": resetPassword,
            "inactive": accountDeactivated
        };

        usersService.updateUser(userId, data).then(response => {
            toast.success(response.message);
        });
    };

    const UserGroups = () => {
        let view = [];

        for (let i = 0; i < userGroups.length; i++) {
            view.push(<MenuItem key={i} value={userGroups[i].id}>{userGroups[i].name}</MenuItem>)
        }

        return view;
    };

    return <div>
        <div className={"large-text gap-left-10"}>
            {user.username}
        </div>

        <Paper className={"user-container"}>
            <div>
                <div>
                    <InputLabel id={"user-group-label"}>User group</InputLabel>
                    <Select
                        labelId={"user-group-label"}
                        value={user.userGroup.id ? user.userGroup.id : 0}
                        onChange={handleUserGroupChange}
                    >
                        {UserGroups()}
                    </Select>
                </div>

                <div>
                    <TextField placeholder={"Reset password"} type={"password"} onChange={handleResetPasswordChange}/>
                </div>

                <div>
                    <FormControlLabel
                        control={<Switch checked={accountDeactivated} onChange={handleAccountDeactivationChange}
                                         color="primary"/>}
                        label="Account deactivated"
                        labelPlacement="end"
                    />
                </div>


                <div className={"update-button"}>
                    <Button variant="contained" color="primary" onClick={handleUpdateUser}>Update</Button>
                </div>
            </div>
        </Paper>
    </div>
};

export default EditUser;
