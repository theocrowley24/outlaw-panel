import React from "react";
import './Dashboard.scss';
import SideBar from "./side-bar/SideBar";
import { Route } from "react-router-dom";
import Players from "./players/Players";
import Groups from "./admin/groups/Groups";
import Vehicles from "./vehicles/Vehicles";
import Users from "./admin/users/Users";

const Dashboard = () => {
    return (
        <div className='wrapper'>
            <SideBar/>

            <div className='content-wrapper'>
                <Route path="/home/players" component={Players} />
                <Route path="/home/vehicles" component={Vehicles} />
                <Route path="/home/admin/users" component={Users}/>
                <Route path="/home/admin/groups" component={Groups}/>
            </div>
        </div>
        
        
    );
};

export default Dashboard;
