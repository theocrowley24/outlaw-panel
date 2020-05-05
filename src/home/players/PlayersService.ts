import Service from "../../services/Service";

class PlayersService extends Service {
    public getAllPlayers(): Promise<any> {
        return this.getRequest('players/getAllPlayers');
    }

    public getPlayerById(playerId: number): Promise<any> {
        return this.postRequest('players/getPlayerById', {id: playerId});
    }
}

export default PlayersService;
