import {Player} from "../players/Player";

export class Vehicle {
    public id: number;
    public owner: string;
    public className: string;
    public inventory: string;
    public status: string;
    public color: number;
    public active: number;
    public impounded: number;
    public destroyed: number;
    public garage: string;

    constructor(data: any) {
        this.id = data?.id;
        this.owner = data?.owner;
        this.className = data?.classname;
        this.inventory = data?.inventory;
        this.status = data?.status;
        this.color = data?.color;
        this.active = data?.active;
        this.impounded = data?.impounded;
        this.destroyed = data?.destroyed;
        this.garage = data?.garage;
    }
}

export class VehicleMapper {
    public static map(data: any): Vehicle[] {
        let vehicles: Vehicle[] = [];

        for (let i = 0; i < data.length; i++) {
            vehicles.push(new Vehicle(data[i]));
        }

        return vehicles;
    }
}
