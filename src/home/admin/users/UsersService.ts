/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import Service from "../../../services/Service";

export class UsersService extends Service {
    public createUser(data: any): Promise<any> {
        return this.postRequest('users/createUser', {data: data});
    }

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
