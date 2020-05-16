/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React from "react";
import './Root.scss';
import {List, ListItem} from "@material-ui/core";

const Root = () => {
  return <div>
      <div className={"large-text gap-left-10"}>
          Outlaw Panel Alpha 1.0
      </div>

      <div className={"changelog"}>
            <div className={"medium-text gap-left-10"}>
                Change log
            </div>

          <List className={"changelog-list"}>
              <ListItem>
                   - Ability to view all players
              </ListItem>
              <ListItem>
                  - Ability to edit a specific player
              </ListItem>
              <ListItem>
                  - Ability to view all vehicles
              </ListItem>
              <ListItem>
                  - Permission and user group system
              </ListItem>
          </List>
      </div>
  </div>
};

export default Root;
