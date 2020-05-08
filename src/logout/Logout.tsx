import React from "react";
import {useCookies} from "react-cookie";

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['uid', 'authToken']);

    removeCookie('uid');
    removeCookie('authToken');

    return (
        <div>Logged out</div>
    );
};

export default Logout;
