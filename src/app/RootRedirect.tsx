/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import {Redirect} from "react-router-dom";

const RootRedirect = () => {
    return <Redirect to={"/home"}/>
};

export default RootRedirect;
