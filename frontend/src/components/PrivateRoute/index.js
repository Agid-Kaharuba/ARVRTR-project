import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../../helpers/auth/isAuthenticated"

export default class PrivateRoute extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            authenticated: undefined,
        };
    }

    async componentWillMount() {
        const isAuth = await isAuthenticated(this.context.authState, this.context.setAuthState);
        this.setState({ authenticated: isAuth })
    }

    render() {
        var Component = this.props.component;
        return (
            this.state.authenticated !== undefined ?
                <Route
                    {...this}
                    render={(props) =>
                        this.state.authenticated ? <Component {...props} /> : <Redirect to="/login" />
                    }
                />
                :
                <>
                    <h1>Loading</h1>
                    <h2>Debugger: Is the backend running?</h2>
                </>
        );
    }

}