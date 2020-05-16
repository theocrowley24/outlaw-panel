/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import Service from "../../services/Service";

class PlayersService extends Service {
    public getAllPlayers(): Promise<any> {
        return this.getRequest('players/getAllPlayers');
    }

    public getPlayerById(playerId: number): Promise<any> {
        return this.postRequest('players/getPlayerById', {id: playerId});
    }

    public updatePlayer(playerId: number, data: any): Promise<any> {
        return this.postRequest('players/updatePlayer', {id: playerId, data: data});
    }
}

export default PlayersService;
