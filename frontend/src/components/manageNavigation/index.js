import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import Navigation from "../navigation";
import AuthNavigation from "../navigation/auth";
import isAuthenticated from "../../helpers/auth/isAuthenticated"

export default class ManageNavigation extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.context.authState.authenticated);
    if (this.context.authState.authenticated){
      return <AuthNavigation />
    }
    else {
      return <Navigation />
    }
  
  }
}