import React, { useState } from "react";
import './Groups.scss';
import PermissionService from "../../permissions/PermissionsService";
import { UserGroupMapper, UserGroup } from "./UserGroup";
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, Button, TextField } from "@material-ui/core";

const Groups = () => {
    let permissionService = new PermissionService();

    const [ranks, setRanks] = useState([new UserGroup(null)]);
    const [selectedRank, setSelectedRank] = useState(new UserGroup(null));
    const [newRankName, setNewRankName] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (value: any) => {
        setOpen(false);
    }

    const handleOnClick = () => {
        setOpen(true);
    }

    const createNewRank = () => {
        permissionService.createNewRank(newRankName);
    }

    const componentDidMount = () => {
        permissionService.getAllRanks().then((data: any) => {
            setRanks(UserGroupMapper.map(data.data));
        });
    }
    
    const Ranks = (): any[] => {
        let view = [];

        for (let i = 0; i < ranks.length; i++) {
            view.push(<MenuItem key={i} value={ranks[i].id}>{ranks[i].name}</MenuItem>);
        }

        return view;
    }

    return (
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
    )
}

export default Groups;