import React from "react";
import './SideBar.scss';
import AuthService from "../../auth/AuthService";

const SideBar = () => {
    let authService = new AuthService();
    
    let user = authService.getUser();

    return (
        <div className='wrapper'>
            <div className='content'>
                <p className='medium-text'><span className="material-icons m-icon">dashboard</span>Outlaw panel</p>
                <p>Welcome, {user?.username}</p>

                <div className='sub-section'>
                    <p className='header'>Life</p>

                    <p className='item'><span className="material-icons m-icon">people</span>Players</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Vehicles</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Gangs</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Houses</p>
                </div>

                <div className='sub-section'>
                    <p className='header'>Admin</p>

                    <p className='item'><span className="material-icons m-icon">people</span>Metrics</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Logs</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Groups</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Users</p>
                </div>

                
            </div>

            <div className='tool-bar'>
                <div className='icons-wrapper'>
                    <span className="material-icons">
                        settings
                    </span>

                    <span className="material-icons">
                        exit_to_app
                    </span> 
                </div>                
            </div>
        </div>
    )
}

export default SideBar;