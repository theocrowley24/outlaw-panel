import React, {Component} from "react";

const TabPanel = ({index, value, component: Component}: {index: number, value: number, component: any}) => {
    if (index === value) {
        return <Component />
    } else {
        return <div/>
    }
};

export default TabPanel;
