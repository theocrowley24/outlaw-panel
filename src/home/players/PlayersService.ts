import Service from "../../services/Service";

class PlayersService extends Service {
    public getAllPlayers(): Promise<any> {
        return this.getRequest('players/getAllPlayers');
    }
}

export default PlayersService;
