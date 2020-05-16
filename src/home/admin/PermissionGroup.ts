/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

export class PermissionGroup {
    public id: number;
    public name: string;

    constructor(data: any) {
        this.id = data?.id;
        this.name = data?.name;
    }
}

export class PermissionGroupMapper {
    public static map(data: any): PermissionGroup[] {
        let permissionGroups: PermissionGroup[] = [];

        for (let i = 0; i < data.length; i++) {
            permissionGroups.push(new PermissionGroup(data[i]));
        }

        return permissionGroups;
    }
}
