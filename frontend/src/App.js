import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";

// IMPORT COMPONENTS
import ManageNavigation from "./components/manageNavigation";
import PrivateRoute from "./components/PrivateRoute";

// IMPORT PAGES
import HomePage from "./pages/home/home.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import CreateNewTraining from './pages/supervisorCreateNewTraining/supervisorCreateNewTraining.js';
import EmployeeProfile from "./pages/profile/employeeProfile";
import LogIn from "./pages/login/login.js";
import SignUp from "./pages/signup/signup.js";

// import appTheme from "./helpers/appTheme";

// IMPORT CONTEXT
import { AuthProvider } from "./context/auth";
// import Signout from "./helpers/auth/signout.js";

function AppProvider(props) {
  return (
    // <ThemeProvider theme={appTheme}>
    <AuthProvider>
      {props.children}
    </AuthProvider>
    // </ThemeProvider>
  );
}

function AppRouter(props) {
  return (
    <Switch>
      <PrivateRoute path="/dashboard"
        exact={true}
        component={Dashboard} />

      <PrivateRoute path="/dashboard/create-new-training"
        exact={true}
        component={CreateNewTraining} />

      <PrivateRoute path="/employee-profile"
        exact={true}
        component={EmployeeProfile} />

      <Route path="/login"
        exact={true}
        component={LogIn}>
      </Route>

      <Route path="/signup"
        exact={true}
        component={SignUp}>
      </Route>

      <Route path="/"
        exact={true}
        component={HomePage}>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <ManageNavigation />
          <div>
            <AppRouter />
          </div>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;