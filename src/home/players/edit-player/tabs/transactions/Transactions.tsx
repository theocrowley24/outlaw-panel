/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import './Transactions.scss';
import {Player} from "../../../Player";
import {SQFObjectParser} from "../../../../../shared/SQFObjectParser";
import {ListItem, ListItemText} from "@material-ui/core";

const Transactions = ({player}: { player: Player }) => {

    const transactionHistory = () => {
        let view: any[] = [];

        let matches = player.myTransactions.match(/\[`(.*?)`,`(.*?)`\]/g);

        if (matches) {
            matches.forEach((element, index) => {
                view.push(<ListItem key={index}><ListItemText>{element}</ListItemText></ListItem>);
            });
        }

        return view;
    };

    return <div className={"transactions-container"}>
        <div className={"transaction-history"}>
            {transactionHistory()}
        </div>
    </div>
};

export default Transactions;
