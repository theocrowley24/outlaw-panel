/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

export class Player {
    public id: number;
    public uid: number;
    public allNames: string;
    public lastName: string;
    public cash: number;
    public bank: number;
    public dirty: number;
    public xp: number;
    public level: number;
    public talents: string;
    public myTransactions: string;
    public gear: string;
    public licenses: string;
    public natoRank: number;
    public rcRank: number;
    public jailed: string;
    public alive: number;
    public adminLevel: number;

    constructor(data: any) {
        this.id = data?.id;
        this.uid = data?.uid;
        this.allNames = data?.all_names;
        this.lastName = data?.last_name;
        this.cash = data?.cash;
        this.bank = data?.bank;
        this.dirty = data?.dirty;
        this.xp = data?.xp;
        this.level = data?.level;
        this.talents = data?.talents;
        this.myTransactions = data?.mytransactions;
        this.gear = data?.gear;
        this.licenses = data?.licenses;
        this.natoRank = data?.NATO_rank;
        this.rcRank = data?.RC_rank;
        this.jailed = data?.jailed;
        this.alive = data?.alive;
        this.adminLevel = data?.adminlevel;
    }
}

export class PlayerMapper {
    public static map(data: any): Player[] {
        if (data === null || !data) {
            return [];
        }

        let players: Player[] = [];

        for (let i = 0; i < data.length; i++) {
            players.push(new Player(data[i]));
        }

        return players;
    }
}
