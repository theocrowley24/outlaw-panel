import React, { useState, useEffect, ChangeEvent } from "react";
import './Groups.scss';
import PermissionService from "../../permissions/PermissionsService";
import { UserGroupMapper, UserGroup } from "./UserGroup";
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, Button, TextField, AppBar, Tabs, Tab, FormControlLabel, Checkbox } from "@material-ui/core";
import { Permission, PermissionMapper } from "./Permission";

const Groups = () => {
    let permissionService = new PermissionService();

    const [ranks, setRanks] = useState([new UserGroup(null)]);
    const [selectedRank, setSelectedRank] = useState(new UserGroup(null));
    const [newRankName, setNewRankName] = useState("");
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [allPermissions, setAllPermissions] = useState([new Permission(null)]);

    const handleClose = (value: any) => {
        setOpen(false);
    }

    const handleOnClick = () => {
        setOpen(true);
    }

    const handleTab = (event: ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }

    const createNewRank = () => {
        permissionService.createNewRank(newRankName);
    }

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        let temp = [...allPermissions];

        let target: Permission | undefined = allPermissions.find(permission => permission.id == parseInt(event.target.name));
        if (target != undefined) {
            let index =  allPermissions.indexOf(target);
            target.has = event.target.checked;
            temp[index] = target;
        }

        setAllPermissions(temp);
    };

    useEffect(() => {
        permissionService.getAllRanks().then((data: any) => {
            setRanks(UserGroupMapper.map(data.data));
        });

        permissionService.getAllPermissions().then((data: any) => {
            let temp = PermissionMapper.map(data.data);

            permissionService.getAllRankPermissions(7).then((data: any) => {
                setAllPermissions(PermissionMapper.setOwnedPermissions(temp, data.data));
            });
        });
      }, []);
    
    const Ranks = (): any[] => {
        let view = [];

        for (let i = 0; i < ranks.length; i++) {
            view.push(<MenuItem key={i} value={ranks[i].id}>{ranks[i].name}</MenuItem>);
        }

        return view;
    }

    const Permissions = (): any[] => {
        let view = [];

        for (let i = 0; i < allPermissions.length; i++) {
            view.push(<FormControlLabel key={i} control={<Checkbox name={allPermissions[i].id?.toString()} onChange={handleCheckbox} checked={allPermissions[i].has || false} />} label={allPermissions[i].name}/>)
        }

        return view;
    }

    return (
        <div>
            <div className="ranks-wrapper">
                <p className="sub-title">Select group<span className="material-icons m-icon" onClick={handleOnClick}>add</span></p>
                <Select>
                    {Ranks()}
                </Select>
                <Dialog open={open} onClose-={handleClose} onBackdropClick={handleClose}>
                        <DialogTitle>Create a new user group</DialogTitle>
                        <DialogContent>
                            <div className="h-centre"><TextField id="standard-basic" label="Name" onChange={e => setNewRankName(e.target.value)} /></div>
                            <div className="flex medium-gap">
                                <div className="h-gap"><Button variant="outlined" onClick={handleClose}>Cancel</Button></div>
                                <div className="h-gap"><Button variant="contained" color="primary" onClick={createNewRank}>Create</Button></div>
                            </div>
                        </DialogContent>
                </Dialog>
            </div>

            <div className="permissions-wrapper">
                <Tabs
                    value={tabValue}
                    onChange={handleTab}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Life" />
                    <Tab label="Admin" />
                </Tabs>

                <div className="checkbox-wrapper">
                    {Permissions()}
                </div>
            </div>
        </div>
        
    )
}

export default Groups;