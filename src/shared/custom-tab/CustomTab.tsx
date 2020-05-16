/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useState} from "react";
import TabPanel from "./TabPanel";
import {AppBar, Tab, Tabs} from "@material-ui/core";

const CustomTab = ({tabLabels, components}: { tabLabels: string[], components: any }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const TabLabels = () => {
        let view: any[] = [];

        for (let i = 0; i < tabLabels.length; i++) {
            view.push(<Tab key={i} label={tabLabels[i]}/>);
        }

        return view;
    };

    const TabPanels = () => {
        let view: any[] = [];

        for (let i = 0; i < components.length; i++) {
            view.push(<TabPanel key={i} value={value} index={i} component={components[i]}/>);
        }

        return view;
    };

    return <div>
        <AppBar position="static" color={"default"}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                {TabLabels()}
            </Tabs>
        </AppBar>
        {TabPanels()}

    </div>
};

export default CustomTab;
