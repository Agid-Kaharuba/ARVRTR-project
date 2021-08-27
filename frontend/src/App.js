import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//STYLES
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from './theme'
// import appTheme from "./helpers/appTheme";

// IMPORT COMPONENTS
import ManageNavigation from "./components/manageNavigation";
import PrivateRoute from "./components/PrivateRoute";
import SignOut from "./components/signout";

// IMPORT HOMEPAGE PAGES
import AboutUs from "./pages/aboutus/aboutus.js";
import HomePage from "./pages/home/home.js";

// IMPORT USER PAGES
import LogIn from "./pages/login/login.js";
import SignUp from "./pages/signup/signup.js";
import EmployeeProfile from "./pages/profile/employeeProfile";
import UserList from "./pages/userslist/userslist.js";

// IMPORT DASHBOARD PAGES
import Dashboard from "./pages/dashboard/dashboard.js";

// IMPORT COURSE PAGES
import CreateNewCourse from './pages/supervisor/CreateCourse';
import ViewTrainingPage from './pages/viewtraining/viewtraining';

// IMPORT TASKS PAGES
import TaskList from "./pages/task/taskslist";
import ViewTask from "./pages/task/viewtask";
import CreateNewTask from "./pages/task/createtask/createtask.js";
import CreateTaskGlobal from "./pages/task/createtask/createtaskglobal.js";

// IMPORT RECIPE PAGES
import RecipesList from "./pages/recipe/recipesList/recipesList.js";
import CreateRecipe from "./pages/recipe/createRecipe/createRecipe.js";
import ViewRecipe from "./pages/recipe/viewRecipe/viewRecipe.js";

// IMPORT STATISTICS PAGES
import Statistics from "./pages/statistics/statistics.js";

// IMPORT CONTEXTS
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

      // Homepage Routes
      <Route path="/"
        exact={true}
        component={HomePage}>
      </Route>

      <Route path="/aboutus"
        exact={true}
        component={AboutUs}>
      </Route>

      // Login Profile User Routes
      <Route path="/login"
        exact={true}
        component={LogIn}>
      </Route>
      <Route path="/signup"
        exact={true}
        component={SignUp}>
      </Route>
      <Route path="/signout"
        exact={true}
        component={SignOut}>
      </Route>
      <PrivateRoute path="/profile"
        exact={true}
        component={EmployeeProfile} />
      <PrivateRoute path="/user"
        exact={true}
        component={UserList}>
      </PrivateRoute>

      // Dashboard Routes
      <PrivateRoute path="/dashboard"
        exact={true}
        component={Dashboard} />
      <PrivateRoute path="/dashboard/create"
        exact={true}
        component={CreateNewCourse} />
      <Route path="/dashboard/:courseId/statistics/:userId"
        exact={true}
        component={Statistics}>
      </Route>
      <PrivateRoute path="/dashboard/:courseId"
        exact={true}
        component={ViewTrainingPage} />

      // Tasks Routes
      <Route path="/task"
        exact={true}
        component={TaskList}>
      </Route>
      <Route path="/task/create"
        exact={true}
        component={CreateTaskGlobal}>
      </Route>

      <Route path="/createtask"
        exact={true}
        component={CreateNewTask}>
      </Route>
      <Route path="/task/:taskId"
        exact={true}
        component={ViewTask}>
      </Route>

      // Recipe Routes
      <Route path="/recipe"
        exact={true}
        component={RecipesList}>
      </Route>
      <Route path="/recipe/create"
        exact={true}
        component={CreateRecipe}>
      </Route>
      <Route path="/recipe/:recipeId"
        exact={true}
        component={ViewRecipe}>
      </Route>

    </Switch>
  );
}

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <AppProvider>
          <BrowserRouter>
            <ManageNavigation />
            <div>
              <AppRouter />
            </div>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;