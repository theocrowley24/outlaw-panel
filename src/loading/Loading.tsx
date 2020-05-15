import React from "react";
import {Backdrop, CircularProgress, createStyles, Theme} from "@material-ui/core";
import './Loading.scss';
import {makeStyles} from "@material-ui/core/styles";

const Loading = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }),
    );

    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading;
