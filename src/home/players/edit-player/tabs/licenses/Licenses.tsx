/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import "./Licenses.scss";
import {Player} from "../../../Player";
import {ListItem, ListItemText} from "@material-ui/core";

const Licenses = ({player}: { player: Player }) => {
    const licenses = () => {
        let view: any[] = [];

        // @ts-ignore
        player.licenses.match(/`(.*?)`/g).forEach((element, index) => {
            view.push(<ListItem key={index}><ListItemText>{element}</ListItemText></ListItem>);
        });

        return view;
    };

    return <div className={"licenses-container"}>
        <div className={"licenses"}>
            {licenses()}
        </div>
    </div>
};

export default Licenses;
