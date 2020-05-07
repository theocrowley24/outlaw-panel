import React, {useState} from "react";
import './Login.scss';
import { TextField, Grid, Container, Box, CssBaseline, Avatar, Typography, FormControlLabel, Checkbox, Button, Link, makeStyles } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AuthService from "../auth/AuthService";
// @ts-ignore
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
  place:'topRight',
  duration:2,
  maxCount:8
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
  const [username, setUsername]= useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  let authService = new AuthService();

  //if (authService.isLoggedIn()) return <Redirect to="/home"/>;

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
      <CssBaseline />
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
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
