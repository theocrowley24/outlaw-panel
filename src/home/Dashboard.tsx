import React from "react";
import './Dashboard.scss';
import SideBar from "./side-bar/SideBar";
import { Route } from "react-router-dom";
import Players from "./players/Players";
import Groups from "./admin/Groups";

const Dashboard = () => {
    return (
        <div className='wrapper'>
            <div>
                <SideBar/>
            </div>

            <div className='content-wrapper'>
                <Route path="/home/players" component={Players} />

                <Route path="/home/admin/groups" component={Groups}/>
            </div>
        </div>
        
        
    );
}

export default Dashboard;
