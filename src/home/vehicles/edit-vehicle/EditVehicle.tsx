/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import queryString from "query-string";

const EditVehicle = (props: any) => {

    let vehicleId: number = Number(queryString.parse(props.location.search).id);

    return <div/>
};

export default EditVehicle;
