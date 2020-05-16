/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

import React, {useState} from "react";
import './Login.scss';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import {Redirect} from "react-router-dom";
import AuthService from "../auth/AuthService";
// @ts-ignore
import ToastServive from 'react-material-toast';
import {useCookies} from "react-cookie";

const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies] = useCookies(['uid', 'authToken']);

    const classes = useStyles();

    if (cookies['uid'] && cookies['authToken']) {
        return <Redirect to="/home"/>;
    }

    const handleSubmit = (event: any): void => {
        event.preventDefault();

        let authService = new AuthService();

        authService.login(username, password).then((data) => {
            if (data.statusCode === 200) {
                toast.success("Welcome");
                props.history.push('/home');
            } else {
                toast.error(data.message);
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Tooltip title={"Contact the server owner"}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>

            </Box>
        </Container>
    );
};

export default Login;
