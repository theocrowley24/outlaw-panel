import PermissionService from "./PermissionsService";
import {Permission} from "../home/admin/Permission";

class PermissionChecker {
    public static hasPermissions(required: PermissionValue, permissions: Permission[]): boolean {
        return true;
    }
}

export enum PermissionValue {
    ViewPlayers = 1,
    ViewPlayer = 2,
    Dashboard = 3
}

export default PermissionChecker;
