/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import './Dashboard.scss';
import SideBar from "./side-bar/SideBar";
import {Route} from "react-router-dom";
import Players from "./players/Players";
import Groups from "./admin/groups/Groups";
import Vehicles from "./vehicles/Vehicles";
import Users from "./admin/users/Users";
import PrivateRoute from "../auth/PrivateRoute";
import {PermissionValue} from "../permissions/PermissionChecker";
import Root from "./root/Root";
import GroupsRouter from "./admin/groups/GroupsRouter";

const Dashboard = () => {
    const getYear = () => {
        return new Date().getFullYear();
    };

    return (
        <div className='wrapper'>
            <SideBar/>

            <div className='content-wrapper'>
                <Route exact path={"/home"} component={Root}/>
                <Route path="/home/players" component={Players}/>
                <Route path="/home/vehicles" component={Vehicles}/>
                <Route path="/home/admin/users" component={Users}/>
                <Route path="/home/admin/groups" component={GroupsRouter}/>

                <small>&copy; Copyright {getYear()}, Theo Crowley. All rights reserved.</small>
            </div>
        </div>

    );
};

export default Dashboard;
