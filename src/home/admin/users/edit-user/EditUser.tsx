import React, {useEffect, useState} from "react";
import './EditUser.scss';
import queryString from "query-string";
import {UsersService} from "../UsersService";
import {User} from "../../../../auth/User";
import {Paper} from "@material-ui/core";

const EditUser = (props: any) => {
    const [user, setUser] = useState(new User(null));

    let userId: number = Number(queryString.parse(props.location.search).id);
    let usersService = new UsersService();

    console.log("hey")

    useEffect(() => {
        usersService.getUserById(userId).then(response => {
            setUser(new User(response.data));
        });
    }, []);

    return <div>
        <div className={"large-text gap-left-10"}>
            {user.username}
        </div>

        <Paper className={"user-container"}>

        </Paper>
    </div>
};

export default EditUser;
