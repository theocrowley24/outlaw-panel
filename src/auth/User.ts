import {UserGroup} from "../home/admin/groups/UserGroup";

export class User {
    public id: number;
    public username: string;
    public userGroup: UserGroup;

    constructor (data: any) {
        this.id = data?.id;
        this.username = data?.username;

        this.userGroup = new UserGroup();
        this.userGroup.id = data?.rank_id;
        this.userGroup.name = data?.rank_name;
    }
}

export class UserMapper {
    public static map(data: any[]): User[] {
        let users = [];

        for (let i = 0; i < data.length; i++) {
            users.push(new User(data[i]));
        }

        return users;
    }
}

