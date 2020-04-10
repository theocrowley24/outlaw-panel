import Service from "./Service";

class PermissionService extends Service {
    public getUsersRank(id: number): Promise<any> {
        return this.postRequest("permissions/getUsersRank", {id: id});
    }

    public getAllRanks(): Promise<any> {
        return this.getRequest("permissions/getAllRanks");
    }

    public createNewRank(name: string): void {
        this.postRequest("permissions/createNewRank", {name: name, permissions: null});
    }

    public getAllPermissionsWithRank(id: number): Promise<any> {
        return this.postRequest("permissions/getAllPermissionsWithRank", {id: id});
    }

    public updateRankPermissions(id: number, permissionIds: number[]): void {
        this.postRequest("permissions/updateRankPermissions", {id: id, permissions: permissionIds});
    }

    public getAllPermissionGroups(): Promise<any> {
        return this.getRequest("permissions/getAllPermissionGroups");
    }

}

export default PermissionService;
