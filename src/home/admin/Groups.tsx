import React, { useState, useEffect, ChangeEvent } from "react";
import './Groups.scss';
import PermissionService from "../../services/PermissionsService";
import { UserGroupMapper, UserGroup } from "./UserGroup";
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, Button, TextField, Tabs, Tab, FormControlLabel, Checkbox, Snackbar } from "@material-ui/core";
import { Permission, PermissionMapper } from "./Permission";
import Alert from '@material-ui/lab/Alert';
import {PermissionGroup, PermissionGroupMapper} from "./PermissionGroup";

const Groups = () => {
    let permissionService = new PermissionService();

    const [ranks, setRanks] = useState([new UserGroup({id: -1, name: "", permissions: null})]);
    const [selectedRank, setSelectedRank] = useState(new UserGroup({id: -1, name: "", permissions: null}));
    const [newRankName, setNewRankName] = useState("");
    const [renameRankName, setRenameRankName] = useState("");
    const [openNewRankDialog, setOpenNewRankDialog] = useState(false);
    const [openRenameRankDialog, setOpenRenameRankDialog] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [allPermissions, setAllPermissions] = useState([new Permission(null)]);
    const [displayedPermissions, setDisplayedPermissions] = useState([new Permission(null)]);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [permissionGroups, setPermissionGroups] = useState([new PermissionGroup(null)]);
    
    useEffect(() => {
        getAllRanks();

        permissionService.getAllPermissionGroups().then((data: any) => {
            setPermissionGroups(PermissionGroupMapper.map(data.data));
        });

        permissionService.getAllPermissions().then((data: any) => {
            let temp = PermissionMapper.map(data.data);
            setAllPermissions(temp);

            let disPerms: Permission[] = [];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].groupId === tabValue) {
                    disPerms.push(temp[i]);
                }
            }

            setDisplayedPermissions(disPerms);
        })

    }, []);

    const getAllRanks = () => {
        permissionService.getAllRanks().then((data: any) => {
            setRanks(UserGroupMapper.map(data.data));
        });
    };

    const showPopup = (message: string) => {
      setPopupMessage(message);
      setOpenPopup(true);
    };

    const handleClose = (value: any) => {
        setOpenNewRankDialog(false);
        setOpenRenameRankDialog(false);
    };

    const handleOnClickNewRankDialog = () => {
        setOpenNewRankDialog(true);
    };

    const handleOnClickRenameRankDialog = () => {
        setOpenRenameRankDialog(true);
    };

    const handleTab = (event: ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);

        let temp: Permission[] = [];
        for (let i = 0; i < allPermissions.length; i++) {
            if (allPermissions[i].groupId === newValue) {
                temp.push(allPermissions[i]);
            }
        }

        setDisplayedPermissions(temp);
    };

    const handleCreateRank = () => {
        permissionService.createNewRank(newRankName).then(() => {
            getAllRanks();
            showPopup("New rank created!");
        }).catch((error: any) => {
            showPopup(error.message);
        });

        setOpenNewRankDialog(false);
    };

    const handleRenameRank = () => {
        permissionService.renameRank(selectedRank.id, renameRankName).then(() => {
            getAllRanks();
            showPopup("Rank renamed!");
        }).catch((error: any) => {
            showPopup(error);
        });

        setOpenRenameRankDialog(false);
    };

    const handleUpdateClick = () => {
        let permissionIds: number[] = [];
        for (let i = 0; i < allPermissions.length; i++) {
            if (allPermissions[i].has) {
                permissionIds.push(allPermissions[i].id);
            }
        }

        permissionService.updateRankPermissions(selectedRank.id, permissionIds).then(() => {
            showPopup("Rank permissions updated!");
        }).catch((error: any) => {
            showPopup(error);
        });
    };

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



    const handleSetRankChange = (event: ChangeEvent<any>) => {
        let group: UserGroup | undefined = ranks.find(rank => rank.id === event.target.value);
        
        if (group !== undefined) {
            setSelectedRank(group);

            permissionService.getAllPermissionsWithRank(group.id).then((data: any) => {
                let temp = PermissionMapper.map(data.data);
                setAllPermissions(temp);

                let disPerms: Permission[] = [];
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].groupId === tabValue) {
                        disPerms.push(temp[i]);
                    }
                }

                setDisplayedPermissions(disPerms);
            });
        }        
    };

    const handleCloseSnackbar = () => {
        setOpenPopup(false);
    };

    const TabLabels = (): any[] => {
        let view:any[] = [];

        for (let i = 0; i < permissionGroups.length; i++) {
            view.push(<Tab key={i} label={permissionGroups[i].name} value={permissionGroups[i].id} />)
        }

        return view;
    };

    const Ranks = (): any[] => {
        let view: any[] = [];

        for (let i = 0; i < ranks.length; i++) {
            if (ranks[i].id !== undefined || ranks[i] !== undefined || ranks[i] !== null || ranks[i].id !== null) {
                view.push(<MenuItem key={i} value={ranks[i].id}>{ranks[i]?.name}</MenuItem>);
            }            
        }

        return view;
    };

    const Permissions = (): any[] => {
        let view: any[] = [];

        for (let i = 0; i < displayedPermissions.length; i++) {
            view.push(<FormControlLabel className="permission" key={i} control={<Checkbox name={displayedPermissions[i].id?.toString()} color="primary" onChange={handleCheckbox} checked={displayedPermissions[i].has || false} />} label={displayedPermissions[i].name}/>)
        }

        return view;
    };

    return (
        <div>
            <div className="ranks-wrapper">
                <p className="sub-title">Select group<span className="material-icons m-icon" onClick={handleOnClickNewRankDialog}>add</span></p>

                <div className={'select-wrapper'}>
                    <Select onChange={handleSetRankChange} value={selectedRank.id}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Ranks()}
                    </Select>

                    <span className="material-icons m-icon" onClick={handleOnClickRenameRankDialog}>
                        text_fields
                    </span>
                </div>

                <Dialog open={openNewRankDialog} onBackdropClick={handleClose}>
                        <DialogTitle>Create a new user group</DialogTitle>
                        <DialogContent>
                            <div className="h-centre"><TextField id="standard-basic" label="Name" onChange={e => setNewRankName(e.target.value)} /></div>
                            <div className="flex medium-gap">
                                <div className="h-gap"><Button variant="outlined" onClick={handleClose}>Cancel</Button></div>
                                <div className="h-gap"><Button variant="contained" color="primary" onClick={handleCreateRank}>Create</Button></div>
                            </div>
                        </DialogContent>
                </Dialog>

                <Dialog open={openRenameRankDialog} onBackdropClick={handleClose}>
                    <DialogTitle>Rename {selectedRank.name}</DialogTitle>
                    <DialogContent>
                        <div className="h-centre"><TextField id="standard-basic" label="Name" onChange={e => setRenameRankName(e.target.value)} /></div>
                        <div className="flex medium-gap">
                            <div className="h-gap"><Button variant="outlined" onClick={handleClose}>Cancel</Button></div>
                            <div className="h-gap"><Button variant="contained" color="primary" onClick={handleRenameRank}>Update</Button></div>
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
                    {TabLabels()}
                </Tabs>

                <div className="checkbox-wrapper">
                    {Permissions()}
                </div>

                <div className="bottom-bar">
                    <Button onClick={handleUpdateClick} variant="contained" color="primary">Update</Button>
                </div>
            </div>

            <Snackbar open={openPopup} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                {popupMessage}
                </Alert>
            </Snackbar>
        </div>
        
    )
};

export default Groups;
