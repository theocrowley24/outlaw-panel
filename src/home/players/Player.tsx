export interface IPlayer {
    id: number;
    allNames: string;
    lastName: string;
    cash: number;
    bank: number;
    profession: string;
    gear: string;
    licenses: string;
    natoRank: number;
    alive: number;
    adminLevel: number;

}

export class Player{
    public id: number;
    public allNames: string;
    public lastName: string;
    public cash: number;
    public bank: number;
    public profession: string;
    public gear: string;
    public licenses: string;
    public natoRank: number;
    public alive: number;
    public adminLevel: number;

    constructor(data: any) {
        this.id = data?.id;
        this.allNames = data?.all_names;
        this.lastName = data?.last_names;
        this.cash = data?.cash;
        this.bank = data?.bank;
        this.profession = data?.profession;
        this.gear = data?.gear;
        this.licenses = data?.licenses;
        this.natoRank = data?.NATO_rank;
        this.alive = data?.alive;
        this.adminLevel = data?.adminlevel;
    }
}

export class PlayerMapper {
    public static map(data: any): Player[] {
        let players: Player[] = [];

        for (let i = 0; i < data.length; i++) {
            players.push(new Player(data[i]));
        }

        return players;
    }
}
