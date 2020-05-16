/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import Service from "../../services/Service";

export class VehiclesService extends Service {
    public getAllVehicles(): Promise<any> {
        return this.getRequest("vehicles/getAllVehicles");
    }
}
