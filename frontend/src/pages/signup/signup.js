import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
// IMPORT COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FormControl } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';

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

export default function SignUp() {
    const classes = useStyles(); //using hook to create classes object
    let history = useHistory();
    const [formState, setFormState] = useState({});
    const [resultState, setResultState] = React.useState(undefined);
    const { authState, setAuthState } = React.useContext(AuthContext);


    const buildResult = () => {
        return (
            <>
                <p>{resultState}</p>
            </>
        );
    };

    const handleChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setFormState({
            ...formState, [name]: value,
        });
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        console.log(formState);
        if (formState.password !== formState.confirmPassword) {
            setResultState("Passwords do not match")
        }
        else {
            var res;
            try {
                res = (await api.auth.register(formState));

                res = (await api.auth.login(formState));
                setAuthState({
                    authenticated: true,
                    ...res.data,
                })
                history.push('/dashboard')
            }
            catch (err) {
                setResultState(err.response.data.err);
            }
        }
    }

    if (authState.authenticated) {
		return <Redirect to="/dashboard" />;
	}

    return (
        <Container component="main" maxWidth="xs"> {/*set container size*/}
            <CssBaseline /> {/*reset styles to a consistent baseline*/}
            <div className={classes.paper}>
                <Typography variant="h3">SIGN UP</Typography>

                <form className={classes.form} onSubmit={handleSignup}>
                    <TextField
                        label="Staff ID"
                        variant="outlined"
                        margin="normal"
                        name="staffid"
                        id="staffid"
                        required //must have input to submit the form
                        fullWidth
                        onChange={handleChange}
                    />
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

                    <TextField
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        name="firstname"
                        id="First Name"
                        required //must have input to submit the form
                        fullWidth
                        onChange={handleChange}
                    />

                    <TextField
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        name="lastname"
                        id="Last Name"
                        required //must have input to submit the form
                        fullWidth
                        onChange={handleChange}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        id="email"
                        type="email"
                        autoComplete="email"
                        required //must have input to submit the form
                        fullWidth
                        onChange={handleChange}
                    />

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

                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        name="confirmPassword"
                        id="confirm password"
                        type="password" //hide password entered
                        required
                        fullWidth
                        onChange={handleChange}
                    />

                    <FormControl component="fieldset">
                        {/* value={value} onChange={handleChange} --event handling, goes in RadioGroup below-- */}
                        <RadioGroup aria-label="account type" name="isSupervisor" row onChange={handleChange}>
                            <FormControlLabel
                                value="true"
                                control={<Radio required={true} />}
                                label="Supervisor"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio required={true} />}
                                label="Employee"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        className={classes.submit}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Confirm
                </Button>

                </form>

            </div>
            {resultState !== undefined && buildResult()}
        </Container>
    );
}