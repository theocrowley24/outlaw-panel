import React, {useEffect, useState} from "react";
import './SideBar.scss';
import AuthService from "../../auth/AuthService";
import {Link, withRouter} from "react-router-dom";

const SideBar = (props: any) => {
    const [user, setUser] = useState({username: ""});


    let authService = new AuthService();

    useEffect(() => {
        authService.getUser().then(userData => {
           setUser(userData.data);
        });
    }, []);

    const handleLogout = () => {
        props.history.push("/logout");
    };

    return (
        <div className='sidebar-wrapper'>
            <div className='content'>
                <p className='medium-text'><span className="material-icons m-icon">dashboard</span>Outlaw panel</p>
                <p>Welcome, {user?.username}</p>

                <div className='sub-section'>
                    <p className='header'>Life</p>

                    <p className='item'><span className="material-icons m-icon">people</span><Link to={'/home/players'} className={'link'}>Players</Link></p>
                    <p className='item'><span className="material-icons m-icon">people</span>Vehicles</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Gangs</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Houses</p>
                </div>

                <div className='sub-section'>
                    <p className='header'>Admin</p>

                    <p className='item'><span className="material-icons m-icon">people</span>Metrics</p>
                    <p className='item'><span className="material-icons m-icon">people</span>Logs</p>
                    <p className='item'><span className="material-icons m-icon">people</span><Link to={`/home/admin/groups`} className={'link'}>Groups</Link></p>
                    <p className='item'><span className="material-icons m-icon">people</span>Users</p>
                </div>

                
            </div>

            <div className='tool-bar'>
                <div className='icons-wrapper'>
                    <span className="material-icons">
                        settings
                    </span>

                    <span className="material-icons pointer" onClick={handleLogout}>
                        exit_to_app
                    </span> 
                </div>                
            </div>
        </div>
    )
};

export default withRouter(SideBar);
