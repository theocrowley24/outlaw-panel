/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import './Gear.scss';
import {Player} from "../../../Player";
import {ListItem, ListItemText} from "@material-ui/core";

const Gear = ({player}: { player: Player }) => {
    const gear = () => {
        let view: any[] = [];

        // @ts-ignore
        player.gear.match(/\[(.*?)\]/g).forEach((element, index) => {
            view.push(<ListItem key={index}><ListItemText>{element}</ListItemText></ListItem>);
        });

        return view;
    };

    return <div className={"gear-container"}>
        <div className={"gear"}>
            {gear()}
        </div>
    </div>
};

export default Gear;
