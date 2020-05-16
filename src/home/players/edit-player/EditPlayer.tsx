/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import "./EditPlayer.scss";
import queryString from "query-string";
import PlayersService from "../PlayersService";
import {Player} from "../Player";
import CustomTab from "../../../shared/custom-tab/CustomTab";
import Licenses from "./tabs/licenses/Licenses";
import Stats from "./tabs/stats/Stats";
import Transactions from "./tabs/transactions/Transactions";
import Gear from "./tabs/gear/Gear";

const EditPlayer = (props: any) => {
    const [player, setPlayer] = useState(new Player(null));

    let playerId: number = Number(queryString.parse(props.location.search).id);

    let playersService = new PlayersService();

    useEffect(() => {
        playersService.getPlayerById(playerId).then((data: any) => {
            setPlayer(new Player(data.data));
        });
    }, []);

    const StatsWrapper = () => {
        return <Stats player={player}/>
    };

    const TransactionsWrapper = () => {
        return <Transactions player={player}/>
    };

    const GearWrapper = () => {
        return <Gear player={player}/>
    };

    const LicensesWrapper = () => {
        return <Licenses player={player}/>
    };

    return <div>
        <div className={"large-text gap-left-10"}>
            {player.allNames}
        </div>
        <div className={"flex flex-wrap info-box-wrapper"}>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>${player.cash}</p>
                        <p>Cash</p>
                    </div>

                    <div className={"flex-right-align"}>
            <span className="material-icons v-centre">
            attach_money
            </span>
                    </div>
                </div>
            </div>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>${player.bank}</p>
                        <p>Bank</p>
                    </div>

                    <div className={"flex-right-align"}>
            <span className="material-icons v-centre">
            account_balance
            </span>
                    </div>
                </div>
            </div>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>{player.natoRank}</p>
                        <p>NATO Rank</p>
                    </div>

                    <div className={"flex-right-align"}>
            <span className="material-icons v-centre">
            pan_tool
            </span>
                    </div>
                </div>
            </div>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>{player.adminLevel}</p>
                        <p>Admin Level</p>
                    </div>

                    <div className={"flex-right-align"}>
                <span className="material-icons v-centre">
                security
                </span>
                    </div>
                </div>
            </div>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>{player.xp}</p>
                        <p>XP</p>
                    </div>

                    <div className={"flex-right-align"}>
                <span className="material-icons v-centre">
                bar_chart
                </span>
                    </div>
                </div>
            </div>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>{player.level}</p>
                        <p>Level</p>
                    </div>

                    <div className={"flex-right-align"}>
                <span className="material-icons v-centre">
                star
                </span>
                    </div>
                </div>
            </div>
            <div className={"info-box shadow"}>
                <div className={"flex"}>
                    <div>
                        <p className={"info-value"}>{player.rcRank}</p>
                        <p>RC rank</p>
                    </div>

                    <div className={"flex-right-align"}>
                <span className="material-icons v-centre">
                local_hospital
                </span>
                    </div>
                </div>
            </div>
        </div>
        <div className={"tab-wrapper"}>
            <CustomTab tabLabels={["Stats", "Licenses", "Transactions", "Gear"]} components={[StatsWrapper, LicensesWrapper, TransactionsWrapper, GearWrapper]}/>
        </div>
    </div>
};

export default EditPlayer;
