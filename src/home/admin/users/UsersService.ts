import Service from "../../../services/Service";

export class UsersService extends Service {
    public updateUser(userId: number, data: any): Promise<any> {
        return this.postRequest('users/updateUser', {id: userId, data: data});
    }

    public getAllUsers(): Promise<any> {
        return this.getRequest('users/getAllUsers');
    }

    public getUserById(userId: number): Promise<any> {
        return this.postRequest('users/getUserById', {id: userId});
    }
}
