/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useEffect, useState} from "react";
import CustomTable from "../../../shared/custom-table/CustomTable";
import {VehiclesService} from "../VehiclesService";
import Vehicles from "../Vehicles";
import {Vehicle, VehicleMapper} from "../Vehicle";

const VehiclesTable = (props: any) => {
    const [vehicles, setVehicles] = useState([new Vehicle(null)]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Vehicles',
                columns: [
                    {
                        Header: 'id',
                        accessor: 'id'
                    },
                    {
                        Header: 'Owner',
                        accessor: 'owner',
                        Cell: (cell: any) => {
                            return (<div className={"vehicle-name"}
                                         onClick={() => {/*props.history.push(`/home/vehicles/edit_vehicle?id=${cell.row.values.id}`)*/}}>
                                <p>{cell.value}</p>
                            </div>);
                        }
                    },
                    {
                        Header: 'Class name',
                        accessor: 'className'
                    },
                    {
                        Header: 'Inventory',
                        accessor: 'inventory'
                    },
                    {
                        Header: 'Status',
                        accessor: 'status'
                    },
                    {
                        Header: 'Color',
                        accessor: 'color'
                    },
                    {
                        Header: 'Active',
                        accessor: 'active'
                    },
                    {
                        Header: 'Impounded',
                        accessor: 'impounded'
                    },
                    {
                        Header: 'Destroyed',
                        accessor: 'destroyed'
                    },
                    {
                        Header: 'Garage',
                        accessor: 'garage'
                    }
                ]
            }
        ],
        [],
    );

    const data = React.useMemo(
        () => {
            return vehicles;
        },
        [vehicles]
    );

    let vehiclesService = new VehiclesService();

    useEffect(() => {
        vehiclesService.getAllVehicles().then((data: any) => {
            setVehicles(VehicleMapper.map(data.data));
        });
    }, []);

    return <div>
        <CustomTable columns={columns} allRows={data} searchField={"allNames"}/>
    </div>
};

export default VehiclesTable;
