import React from "react";
import './Dashboard.scss';
import SideBar from "./side-bar/SideBar";
import { Router, Route } from "react-router-dom";
import Players from "./players/Players";

const Dashboard = () => {
    return (
        <div className='wrapper'>
            <div>
                <SideBar></SideBar>
            </div>

            <div className='content-wrapper'>
                <Route path="/home/players" component={Players} />
            </div>
        </div>
        
        
    );
}

export default Dashboard;