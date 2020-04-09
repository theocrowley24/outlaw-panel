export class Permission {
    public id: number;
    public name: string;
    public has: boolean = false;

    constructor(data: any) {
        this.id = data?.id;
        this.name = data?.name;
    }
}

export class PermissionMapper {
    public static map(data: any): Permission[] {
        if (data == null) {
            return [];
        }

        let permissions: Permission[] = [];

        for (let i = 0; i < data.length; i++) {
            permissions.push(new Permission(data[i]));
        }

        return permissions;
    }

    public static setOwnedPermissions(permissions: Permission[], data: any): Permission[] {
        let temp: number[] = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i].permission_id);
        }

        for (let i = 0; i < temp.length; i++) {
            let target: Permission | undefined = permissions.find(permission => permission.id == temp[i]);
            if (target != undefined) {
                let index =  permissions.indexOf(target);
                target.has = true;
                permissions[index] = target;
            }
        }
 
        return permissions;
    }
}