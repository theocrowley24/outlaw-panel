import Service from "../../services/Service";

export class VehiclesService extends Service{
    public getAllVehicles(): Promise<any> {
        return this.getRequest("vehicles/getAllVehicles");
    }
}
