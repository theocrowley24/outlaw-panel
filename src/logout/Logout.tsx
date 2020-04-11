import React from "react";
import AuthService from "../auth/AuthService";

const Logout = () => {
    let authService = new AuthService();
    authService.logout();

    return (
        <div>Logged out</div>
    );
}

export default Logout;
