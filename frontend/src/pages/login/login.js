import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

// IMPORT COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Alert } from "@material-ui/lab";

import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";
import isAuthenticated from "../../helpers/auth/isAuthenticated"

//creating the react hook
const useStyles = makeStyles((theme) => ({
    //button setup
    submit: {
        margin: theme.spacing(4, 0, 1), //top space, LR align, bottom space
     },
    //form setup
    form: {
        marginTop: theme.spacing(2), //top space
        width: '100%', //form width
    },
    //setup for the overall page
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(7),
    },
}));

export default function LogIn() {
    const classes = useStyles(); //using hook to create classes object
    let history = useHistory();
    const [loginState, setLoginState] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = React.useState(undefined);
    const { authState, setAuthState } = React.useContext(AuthContext);

    const handleChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setLoginState({
        ...loginState, [name]: value,
        });
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        var res;
        try {
            res = (await api.auth.login(loginState));
            setAuthState({
                authenticated: true,
                ...res.data,
            })
            history.push('/dashboard')
        }
        catch (err) {
            setLoginError(err.response.data.err);
        }
    }

    const signupClick = () => {
        history.push('/signup')
    }

    const buildLoginError = () => {
        return (
        <>
            <Alert severity="error">{loginError}</Alert>
        </>
        );
    };
  // TODO: someone on frontend please move or re-space this
    const errorSpace = () => {
        return (
        <>
            <Alert severity="error" style={{ opacity: 0 }} />
        </>
        );
    };

    return (
        <Container component="main" maxWidth="xs"> {/*set container size*/}
        <CssBaseline /> {/*reset styles to a consistent baseline*/}
        <div className={classes.paper}>
            <Typography variant="h3">LOGIN</Typography>

            <form className={classes.form} onSubmit={handleLogin}>
            <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                name="username"
                id="username"
                required //must have input to submit the form
                fullWidth
                onChange={handleChange}
            />
            {/* TODO: implement forgot username */}
            {/* <Link href="#" variant="body2">Forgot username?</Link> */}

            <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                name="password"
                id="password"
                type="password" //hide password entered
                required
                fullWidth
                onChange={handleChange}
            />
            {/* TODO: implement forgot password */}
            {/* <Link href="#" variant="body2">Forgot password?</Link> */}

            {loginError !== undefined ? buildLoginError() : errorSpace()}

            <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
            >
                Login
            </Button>

            <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
                onClick={signupClick}
            >
                Sign Up
            </Button>
            </form>

        </div>
        </Container>
    );
  };

  if (authState.authenticated) {
		return <Redirect to="/dashboard" />;
	}

  return (
    <Container component="main" maxWidth="xs"> {/*set container size*/}
      <CssBaseline /> {/*reset styles to a consistent baseline*/}
      <div className={classes.paper}>
        <Typography variant="h3">LOGIN</Typography>

        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            name="username"
            id="username"
            required //must have input to submit the form
            fullWidth
            onChange={handleChange}
          />
          {/* TODO: implement forgot username */}
          {/* <Link href="#" variant="body2">Forgot username?</Link> */}

          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            name="password"
            id="password"
            type="password" //hide password entered
            required
            fullWidth
            onChange={handleChange}
          />
          {/* TODO: implement forgot password */}
          {/* <Link href="#" variant="body2">Forgot password?</Link> */}

          {loginError !== undefined ? buildLoginError() : errorSpace()}

          <Button
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>

          <Button
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
            onClick={signupClick}
          >
            Sign Up
          </Button>
        </form>

      </div>
    </Container>
  );
}
