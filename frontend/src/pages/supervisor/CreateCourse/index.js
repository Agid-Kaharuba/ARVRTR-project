import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from '@material-ui/core/ListSubheader';

// import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import PlaceholderImage from "../../../components/uploadImage";
import bbt from "../../../images/bbt.jpg";


const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecorationLine: 'underline'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 2,
    flex: 1,
  },
  flex: {
    display: 'flex',
  },
  container: {
    width: "20%",
  },
  trainDiv: {
    width: "80%",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }

}));

// function createData(name, description, recipe, task) {
//   return { name, description, recipe, task };
// }

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewTrainingDialog(props) {
  const classes = useStyles();
  const { onClose: onCloseTraining, open: openTraining } = props;
  const [imagesrc, setImagesrc] = useState(bbt);


  //SAVE COURSE
  const [formState, setFormState] = useState({ name: "", description: "" });
  const { authState, setAuthState } = React.useContext(AuthContext);
  let history = useHistory();

  const handleChange = async (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState, [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();;
    await api.course.create(authState.token, { ...formState, tasks: rowsTasks, assignedEmployees: rowsEmployees });
    history.push('/dashboard');
    window.location.reload(false);
  }

  const handleCloseTraining = () => {
    onCloseTraining();
  };


  // CREATE TASKS
  const [openTask, setOpenTask] = React.useState(false);

  const handleClickOpenTask = () => {
    setOpenTask(true);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  const imageChange = (e) => {
    setImagesrc(e);
  
}

  const [tasksState, setTasksState] = useState(undefined);

  const fetchDataTask = async () => {
    const res = await api.task.getAll(authState.token);
    setTasksState(res.data);
  };

  useEffect(() => {
    if (tasksState === undefined) {
      fetchDataTask();
    }
  });


  const [rowsTasks, setRowsTasks] = React.useState([]);

  const [checkedTask, setCheckedTask] = React.useState([1]);


  const handleToggleTask = (value) => () => {
    const currentIndex = checkedTask.indexOf(value);
    const currentIndexRow = rowsTasks.indexOf(value);
    const newChecked = [...checkedTask];
    const newrows = [...rowsTasks];

    if (currentIndex === -1) {
      newChecked.push(value);
      newrows.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      newrows.splice(currentIndexRow, 1);
    }

    setCheckedTask(newChecked);
    setRowsTasks(newrows);
  };

  const buildTask = (task) => {
    return (
      <div>
        {[0].map((value) => {
          const labelId = `checkbox-list-secondary-label-${task}`;
          return (
            <ListItem key={task} button>
              <ListItemAvatar>
                <Avatar
                // alt={`Avatar n°${user + 1}`}
                // src={`/static/images/avatar/${user + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={task.name} alignItems="flex-start"
                secondary={task.description} />

              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggleTask(task)}
                  checked={checkedTask.indexOf(task) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </div>
    )
  }

  // const [tasksState, setTasksState] = useState(undefined);


  const buildTaskTable = (task) => {
    return (
      <TableRow key={task.name}>
        <TableCell align="left">{task.name}</TableCell>
        <TableCell align="left">{task.description}</TableCell>
        <TableCell align="left">{task.type}</TableCell>
        <TableCell align="right">
          <Link to={`/task/${task._id}`}>
            <Button variant="outlined" color="secondary">View Task</Button>
          </Link>
        </TableCell>
      </TableRow>
    )
  }



  //ASSIGN EMPLOYEE
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [usersState, setUsersState] = useState(undefined);

  const fetchDataUser = async () => {
    const res = await api.user.search(authState.token, "isSupervisor=false");
    setUsersState(res.data);
  };

  useEffect(() => {
    if (usersState === undefined) {
      fetchDataUser();
    }
  });



  const [rowsEmployees, setRowsEmployees] = React.useState([]);

  const [checkedEmployees, setCheckedEmployees] = React.useState([1]);


  const handleToggle = (value) => () => {
    const currentIndex = checkedEmployees.indexOf(value);
    const currentIndexRow = rowsEmployees.indexOf(value);
    const newChecked = [...checkedEmployees];
    const newrows = [...rowsEmployees];

    if (currentIndex === -1) {
      newChecked.push(value);
      // newrows.push(createDataTask(value.firstname, value.lastname, value.staffid),);
      newrows.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      // newrows.push(createDataTask(value.firstname, value.lastname, value.staffid),);
      newrows.splice(currentIndexRow, 1);
    }

    setCheckedEmployees(newChecked);
    setRowsEmployees(newrows);
  };

  const buildUser = (user) => {
    return (
      <div>
        {[0].map((value) => {
          const labelId = `checkbox-list-secondary-label-${user}`;
          return (
            <ListItem key={user} button>
              <ListItemAvatar>
                <Avatar
                // alt={`Avatar n°${user + 1}`}
                // src={`/static/images/avatar/${user + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={user.firstname + " " + user.lastname} alignItems="flex-start"
                secondary={user.staffid} />

              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(user)}
                  checked={checkedEmployees.indexOf(user) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </div>
    )
  }

  //Build User Table
  const fetchDataUserTable = async () => {
    const res = await api.user.get(authState.token);
    setUsersState(res.data);
  };

  useEffect(() => {
    if (usersState === undefined) {
      fetchDataUserTable();
    }
  });

  function createData(name, description, type) {
    return { name, description, type };
  }

  const buildRowTable = (row) => {
    return (
      <TableRow key={row}>
        <TableCell align="left">{row.firstname + " " + row.lastname}</TableCell>
        <TableCell align="left">{row.staffid}</TableCell>
        <TableCell align="right">
          <Button component={Link} color="secondary" variant="outlined" to={"/statistics"}>
            View
          </Button>
        </TableCell>
      </TableRow>
    )
  }

  //Build Stepper

  function getSteps() {
    return ['Training Details', 'Assign Tasks', 'Assign Employees'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item sm={12} md={3}>
              <PlaceholderImage imageChange={imageChange} imagesrc={imagesrc}/>
            </Grid>
            <Grid item sm={12} md={9}>
              <form>
                <Box my={2}>
                  <Typography variant='h5'>Training Name</Typography>
                  <TextField
                    id="filled-multiline-static"
                    label="Enter the Training's Name"
                    fullWidth='true'
                    variant="filled"
                    name="name"
                    onChange={handleChange}
                  />
                </Box>
                <Box my={2}>
                  <Typography variant='h5' >Training Description</Typography>
                  <TextField
                    id="filled-multiline-static"
                    label="Enter the Training's Description"
                    multiline
                    rows={4}
                    fullWidth='true'
                    variant="filled"
                    name="description"
                    onChange={handleChange}
                  />
                </Box>
              </form>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <div>
            <Grid item>
              {/* <Button component={Link} color="secondary" variant="contained" onClick={handleClickOpenTask}>
              Add Task
            </Button> */}
              <div >
                <Button className={classes.title} component={Link} color="primary" variant="contained" to={"/task/create"}>
                  Create Task
                </Button>

                <Button className={classes.title} variant="contained" color="primary" onClick={handleClickOpenTask}>
                  Assign Task
                </Button>
                <Dialog fullScreen open={openTask} onClose={handleCloseTask} TransitionComponent={Transition}>
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={handleCloseTask} aria-label="close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        Available Tasks
                      </Typography>
                      <Button autoFocus color="inherit" onClick={handleCloseTask}>
                        Save
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <List>
                    <ListSubheader component="div" id="nested-list-subheader">
                      Select the tasks to add to this course.
                    </ListSubheader>
                    {/* {usersState ?
                    usersState.map((task) => {
                      return buildTask(task);
                    })
                    :
                    <h1>LOADING</h1>
                  } */}
                    {tasksState ?
                      tasksState.map((task) => {
                        return buildTask(task);
                      })
                      :
                      <h1>LOADING</h1>
                    }
                  </List>
                </Dialog>
              </div>
            </Grid>
            <Box m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.bold} align="left">Name</TableCell>
                      <TableCell className={classes.bold} align="left">Description</TableCell>
                      <TableCell className={classes.bold} align="left">Task Type</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsTasks ?
                      rowsTasks.map((task) => {
                        return buildTaskTable(task);
                      })
                      :
                      <h1>LOADING</h1>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
        );
      case 2:
        return (
          <div>
            <Box m={5}>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='baseline'>
                <Grid item>
                  <Typography variant='h5'>
                    Assigned Employees
                  </Typography>
                </Grid>
                <Grid item>
                  <div>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                      Assign User
                    </Button>
                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                      <AppBar className={classes.appBar}>
                        <Toolbar>
                          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                          </IconButton>
                          <Typography variant="h6" className={classes.title}>
                            Available Employees
                          </Typography>
                          <Button autoFocus color="inherit" onClick={handleClose}>
                            Save
                          </Button>
                        </Toolbar>
                      </AppBar>
                      <List>
                        <ListSubheader component="div" id="nested-list-subheader">
                          Select the employees to add to this course.
                        </ListSubheader>
                        {usersState ?
                          usersState.map((user) => {
                            return buildUser(user);
                          })
                          :
                          <h1>LOADING</h1>
                        }
                      </List>
                    </Dialog>
                  </div>
                </Grid>
              </Grid>
              <Box my={1}>
                <Divider variant="middle" />
              </Box>
            </Box>


            <Box m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.bold} align="left">Name</TableCell>
                      <TableCell className={classes.bold} align="left">Staff ID</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
              {usersState ?
                  usersState.map((user) => {
                    return buildUserTable(user);
                  })
                  :
                  <h1>LOADING</h1>
                }
            </TableBody> */}
                  <TableBody>
                    {rowsEmployees ?
                      rowsEmployees.map((row) => {
                        return buildRowTable(row);
                      })
                      :
                      <h1>LOADING</h1>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleStepperNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      handleSubmit();
      handleCloseTraining();
    }
  };

  const handleStepperBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepperReset = () => {
    setActiveStep(0);
  };

  function DialogTitle(props) {
    const classes = useStyles();
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  }

  return (
    <div>
      <Dialog onClose={handleCloseTraining} open={openTraining} disableBackdropClick disableEscapeKeyDown fullWidth="true" maxWidth="md">
        <DialogTitle onClose={handleCloseTraining}>Change Password</DialogTitle>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleStepperBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStepperNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </Dialog>

    </div>
  )
}