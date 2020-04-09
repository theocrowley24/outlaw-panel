import React, { useState, useEffect, ChangeEvent } from "react";
import './Groups.scss';
import PermissionService from "../../permissions/PermissionsService";
import { UserGroupMapper, UserGroup } from "./UserGroup";
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, Button, TextField, AppBar, Tabs, Tab, FormControlLabel, Checkbox } from "@material-ui/core";
import { Permission, PermissionMapper } from "./Permission";

const Groups = () => {
    let permissionService = new PermissionService();

    const [ranks, setRanks] = useState([new UserGroup({id: -1, name: "", permissions: null})]);
    const [selectedRank, setSelectedRank] = useState(new UserGroup({id: -1, name: "", permissions: null}));
    const [newRankName, setNewRankName] = useState("");
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [allPermissions, setAllPermissions] = useState([new Permission(null)]);
    
    useEffect(() => {
        permissionService.getAllRanks().then((data: any) => {
            setRanks(UserGroupMapper.map(data.data));
        });
    }, []);

    const handleClose = (value: any) => {
        setOpen(false);
    }

    const handleOnClick = () => {
        setOpen(true);
    }

    const handleTab = (event: ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    }

    const handleCreateRank = () => {
        permissionService.createNewRank(newRankName);
        setOpen(false);
    }

    const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        let temp = [...allPermissions];

        let target: Permission | undefined = allPermissions.find(permission => permission.id === parseInt(event.target.name));
        if (target !== undefined) {
            let index =  allPermissions.indexOf(target);
            target.has = event.target.checked;
            temp[index] = target;
        }
        
        setAllPermissions(temp);
    };

    const handleUpdateClick = () => {
        let permissionIds: number[] = [];
        for (let i = 0; i < allPermissions.length; i++) {
            if (allPermissions[i].has) {
                permissionIds.push(allPermissions[i].id);
            }            
        }

        permissionService.updateRankPermissions(selectedRank.id, permissionIds);
        
    }

    const handleSetRankChange = (event: ChangeEvent<any>) => {
        let group: UserGroup | undefined = ranks.find(rank => rank.id === event.target.value);
        
        if (group !== undefined) {
            setSelectedRank(group);

            permissionService.getAllPermissions().then((data: any) => {
                let temp = PermissionMapper.map(data.data);
    
                permissionService.getAllRankPermissions(group !== undefined ? group.id : 0).then((data: any) => {
                    setAllPermissions(PermissionMapper.setOwnedPermissions(temp, data.data));
                });
            }); 
        }        
    }

    const Ranks = (): any[] => {
        let view: any[] = [];

        for (let i = 0; i < ranks.length; i++) {
            if (ranks[i].id !== undefined || ranks[i] !== undefined || ranks[i] !== null || ranks[i].id !== null) {
                view.push(<MenuItem key={i} value={ranks[i].id}>{ranks[i]?.name}</MenuItem>);
            }            
        }

        return view;
    }

    const Permissions = (): any[] => {
        let view: any[] = [];

        for (let i = 0; i < allPermissions.length; i++) {
            view.push(<FormControlLabel key={i} control={<Checkbox name={allPermissions[i].id?.toString()} color="primary" onChange={handleCheckbox} checked={allPermissions[i].has || false} />} label={allPermissions[i].name}/>)
        }

        return view;
    }

    return (
        <div>
            <div className="ranks-wrapper">
                <p className="sub-title">Select group<span className="material-icons m-icon" onClick={handleOnClick}>add</span></p>
                <Select onChange={handleSetRankChange} value={selectedRank.id}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Ranks()}
                </Select>
                <Dialog open={open} onBackdropClick={handleClose}>
                        <DialogTitle>Create a new user group</DialogTitle>
                        <DialogContent>
                            <div className="h-centre"><TextField id="standard-basic" label="Name" onChange={e => setNewRankName(e.target.value)} /></div>
                            <div className="flex medium-gap">
                                <div className="h-gap"><Button variant="outlined" onClick={handleClose}>Cancel</Button></div>
                                <div className="h-gap"><Button variant="contained" color="primary" onClick={handleCreateRank}>Create</Button></div>
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

                <div className="bottom-bar">
                    <Button onClick={handleUpdateClick} variant="contained" color="primary">Update</Button>
                </div>
                
            </div>
        </div>
        
    )
}

export default Groups;