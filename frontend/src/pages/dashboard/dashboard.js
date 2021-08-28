import React, { useEffect, useState, useContext } from "react";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, Card, CardContent, CardActions, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import CreateNewTrainingDialog from "../supervisor/CreateCourse";


const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecorationLine: 'none'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650,
  },
})

const cardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CreateNewTrainingPage() {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [coursesState, setCoursesState] = useState(undefined);
  // const [coursesState, setCoursesState] = useState([{"name":"test","description":"asdsdf"},{"name":"test","description":"asdsdf"}]);

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const fetchData = async () => {
    const res = await api.course.getAll(authState.token);
    setCoursesState(res.data);
  };

  useEffect(() => {
    if (coursesState === undefined) {
      fetchData();
    }
  });

  //Passes courseID and authState token to launch XR training module
  const handleLaunchXR = (courseID) => {
    const token = authState.token
    window.open('xrt-training://?courseId=' + courseID + '&token=' + token)
  }

  const buildCourse = (course) => {
    return (
      <Box mx={5} my={2}>
        <Paper>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {course.name} - {course.description}
              </Typography>

            </CardContent>
            <CardActions>
              <Link className={classes.underline} to={`/dashboard/${course._id}`}>
                <Button size="small">View Training</Button>
              </Link>
              <Button size="small" onClick={() => handleLaunchXR(course._id)}>Launch XR</Button>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    )
  }
  //Course is now changed to Training
  //Line 104 checks if the user is a supervisor and show create training button if they are.
  return (
    <Box>

      <Box m={5}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='baseline'>
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            {authState.user.isSupervisor && (
              <div>
                <Button onClick={handleDialogOpen} color="primary" variant="contained">Create Training</Button>
                <CreateNewTrainingDialog open={open} onClose={handleClose}></CreateNewTrainingDialog>
              </div>
            )}
          </Grid>
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>
      </Box>

      <Box m={5}>
        {coursesState ?
          coursesState.map((course) => {
            return buildCourse(course);
          })
          :
          <h1>LOADING</h1>
        }
      </Box>
    </Box>
  )
}