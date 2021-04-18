import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Route, Redirect } from "react-router-dom";
import api from "../../helpers/api"

export default class PrivateRoute extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            authenticated: undefined,
        };
    }

    async isAuthenticated() {
        if (this.context.authState.authenticated) {
            try {
                const res = await api.auth.verify(this.context.authState.token);
                return true;
            }
            catch (err) {
                return false;
            }
        } else {
            return false;
        }
    };

    async componentWillMount() {
        const isAuth = await this.isAuthenticated();
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