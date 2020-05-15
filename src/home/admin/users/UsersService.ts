import Service from "../../../services/Service";

export class UsersService extends Service {
    public getAllUsers(): Promise<any> {
        return this.getRequest('users/getAllUsers');
    }
}
