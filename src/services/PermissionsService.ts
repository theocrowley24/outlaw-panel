import Service from "./Service";

class PermissionService extends Service {
    public userHasPermission(userId: number, permissionId: number): Promise<any> {
        return this.postRequest("permissions/userHasPermission", {userId: userId, permissionId: permissionId});
    }

    public getUsersRank(id: number): Promise<any> {
        return this.postRequest("permissions/getUsersRank", {id: id});
    }

    public getAllRanks(): Promise<any> {
        return this.getRequest("permissions/getAllRanks");
    }

    public createNewRank(name: string): Promise<any> {
        return this.postRequest("permissions/createNewRank", {name: name, permissions: null});
    }

    public getAllPermissionsWithRank(id: number): Promise<any> {
        return this.postRequest("permissions/getAllPermissionsWithRank", {id: id});
    }

    public getAllPermissions(): Promise<any> {
        return this.getRequest("permissions/getAllPermissions");
    }

    public updateRankPermissions(id: number, permissionIds: number[]): Promise<any> {
        return this.postRequest("permissions/updateRankPermissions", {id: id, permissions: permissionIds});
    }

    public getAllPermissionGroups(): Promise<any> {
        return this.getRequest("permissions/getAllPermissionGroups");
    }

    public renameRank(rankId: number, newName: string): Promise<any> {
        return this.postRequest("permissions/updateRank", {id: rankId, name: newName});
    }
}

export default PermissionService;
