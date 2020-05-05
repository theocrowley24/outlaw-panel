import React, {Component, useState} from "react";
import TabPanel from "./TabPanel";
import {AppBar, Tab, Tabs} from "@material-ui/core";

const CustomTab = ({tabLabels, components}: {tabLabels: string[], components: any}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const TabLabels = () => {
        let view:any[] = [];

        for (let i = 0; i < tabLabels.length; i++) {
            view.push(<Tab label={tabLabels[i]} />);
        }

        return view;
    };

    const TabPanels = () => {
      let view:any[] = [];

      for (let i = 0; i < components.length; i++) {
          view.push(<TabPanel value={value} index={i} component={components[i]} />);
      }

      return view;
    };

    return <div>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                {TabLabels()}
            </Tabs>
        </AppBar>
        {TabPanels()}

        </div>
}

export default CustomTab;
