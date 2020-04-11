import React from "react";
import {CircularProgress} from "@material-ui/core";
import './Loading.scss';

const Loading = () => {
    return (
        <div className="centre">
            <CircularProgress />
        </div>
    )
}

export default Loading;
