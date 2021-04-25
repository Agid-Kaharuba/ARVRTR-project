import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { Divider, ListItemIcon } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import {grey, purple} from '@material-ui/core/colors'
import { AuthContext } from "../../context/auth";
const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
	root: {
    flexGrow: 1
  },
	flex: {
	  flex: 1
	},
	drawerPaper: {
	  position: "relative",
	  width: drawerWidth
	},
	menuButton: {
	  marginLeft: -12,
	  marginRight: 20
	},
	toolbarMargin: theme.mixins.toolbar,
	aboveDrawer: {
    background: "linear-gradient(45deg, #662D8C  10%, #ED1E79)",
    color: "white",
	  zIndex: theme.zIndex.drawer + 1
	}
  });

//Guest Tool bar
const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
        variant="h5" 
        color="inherit" 
        className={classes.flex}>
          {/* FAST W13 */}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));
//Guest drawer
const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Box>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem>
            <ListItemIcon>
              <HomeIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Welcome!" />
          </ListItem>
          <Divider/>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("HomePage")}
          >
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem 
          button 
          component={Link}
          to="/dashboard"
          onClick={onItemClick("Dashboard")}>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <ListItem 
          button 
          component={Link}
          to="/profile"
          onClick={onItemClick("Profile")}>
            <ListItemText>Profile</ListItemText>
          </ListItem>
          <ListItem 
          button 
          component={Link}
          to="/taskslist"
          onClick={onItemClick("Tasks")}>
            <ListItemText>Tasks</ListItemText>
          </ListItem>
          <ListItem 
          button 
          component={Link}
          to="/signout"
          onClick={onItemClick("SignOut")}>
            <ListItemText>Sign Out</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Link exact to="/" />
        <Link to="/login" />
        <Link to="/signup" />
        <Link to="/employee-profile" />
        <Link to="/taskslist" />
      </main>
    </Box>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  // const [title, setTitle] = useState("Home");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    // setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar 
      onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);
