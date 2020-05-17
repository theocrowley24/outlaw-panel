/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import './SideBar.scss';
import AuthService from "../../auth/AuthService";
import {Link, withRouter} from "react-router-dom";
import {Badge} from "@material-ui/core";

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

                    <p className='medium-text'><span className="material-icons m-icon">dashboard</span>
                        <Badge color="secondary" badgeContent="Alpha 1.0">
                            <Link to={`/`} className={'link-title'}>Outlaw Panel</Link>
                        </Badge>
                    </p>

                <p>Welcome, {user?.username}</p>

                <div className='sub-section'>
                    <p className='header'>Life</p>

                    <p className='item'>
                        <span className="material-icons m-icon">
                            <Badge color="secondary" badgeContent="WIP">
                                people
                            </Badge>
                        </span>
                        <Link to={'/home/players'} className={'link'}>
                            Players
                        </Link>
                    </p>
                    <p className='item'>
                        <span className="material-icons m-icon">people</span>
                        <Link to={'/home/vehicles'} className={'link'}>
                            Vehicles
                        </Link>
                    </p>
                </div>

                <div className='sub-section'>
                    <p className='header'>Admin</p>

                    <p className='item'><span className="material-icons m-icon">people</span><Link
                        to={`/home/admin/groups`} className={'link'}>Groups</Link></p>
                    <p className='item'><span className="material-icons m-icon">people</span><Link
                        to={`/home/admin/users`} className={'link'}>Users</Link></p>
                </div>
            </div>

            <div className='tool-bar'>
                <div className='icons-wrapper'>
                    <span className="material-icons">
                        settings
                    </span>
                    <Link to={`/logout`} className={'link-title'}>
                        <span className="material-icons pointer">
                            exit_to_app
                        </span>
                    </Link>

                </div>
            </div>
        </div>
    )
};

export default withRouter(SideBar);
