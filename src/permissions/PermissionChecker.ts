/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import {Permission} from "../home/admin/Permission";

class PermissionChecker {
    public static hasPermission(required: PermissionValue, permissions: Permission[]): boolean {
        return permissions.some(p => p.id === required && p.has);
    }
}

export enum PermissionValue {
    ViewPlayers = 1,
    ViewPlayer = 2,
    UpdatePlayer = 17,
    Dashboard = 3,
    ViewUsers = 20,
    ViewUser = 22,
    UpdateUser = 21,
    ViewRanks = 14,
    CreateUser = 23
}

export default PermissionChecker;
