import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export default function SignOut(props) {
    const { authState, setAuthState } = React.useContext(AuthContext);
    setAuthState({authenticated: false});
    return <Redirect to="/" />;
}