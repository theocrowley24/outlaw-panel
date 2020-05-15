export class UserGroup {
    public id: number;
    public name: string;
    public permissions: any[];

    constructor(data?: any) {
        this.id = data?.id;
        this.name = data?.name;
        this.permissions = data?.permissions;
    }
}

export class UserGroupMapper {
    public static map(data: any): UserGroup[] {
        if (data == null) {
            return [];
        }

        let userGroups: UserGroup[] = [];

        for (let i = 0; i < data.length; i++) {
            userGroups.push(new UserGroup(data[i]));
        }

        return userGroups;
    }   
}
