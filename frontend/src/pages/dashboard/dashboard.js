import React, { useEffect, useState, useContext } from "react";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, Card, CardContent, CardActions, Grid, CardMedia, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";


const useStyles = makeStyles({
  root: {
    minWidth: 250,
    textDecoration: 'none',
    height: 315
  },
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
  media: {
    height: 143,
    backgroundSize: 'contain'
  },
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  trainingModules: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)'
  },
  trainingImage: {
    height: 143,
    backgroundSize: 'contain',
    marginBottom: 45
  },
  buttons: {
    marginLeft: 10
  },
  text: {
    textAlign: 'center'
  },
  actionArea: {
    height: 315
  }
})



export default function CreateNewTrainingPage() {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [coursesState, setCoursesState] = useState(undefined);
  // const [coursesState, setCoursesState] = useState([{"name":"test","description":"asdsdf"},{"name":"test","description":"asdsdf"}]);

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

   const createTrainingModules = () => {
     return(
       <div className = {classes.trainingModules}>
        {coursesState.map((course) => {
          return buildCourse(course);
        })}
        {/* Line checks if the user is a supervisor and show create training button if they are. */}
        {authState.user.isSupervisor && (

            <Grid container className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={"/dashboard/create"} className={classes.underline}>
              <Card className={classes.root} variant="outlined">
                <CardActionArea className={classes.actionArea}>
                <CardMedia className={classes.trainingImage}
                //these images are just placeholders for now
                image="https://icons.veryicon.com/png/o/miscellaneous/standard-general-linear-icon/plus-60.png"
                title="Create New Training"
                />
                <CardContent className={classes.text}>
                  <Typography gutterBottom variant="h6" component="h2">
                    Create New Training
                  </Typography>
                </CardContent>
                </CardActionArea>
                </Card>
                </Link>
              </Grid>
              
            </Grid>
        )}
    </div>
     )
  }

  const buildCourse = (course) => {
    return (
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.root} variant="outlined">
            <CardActionArea className={classes.actionArea}>
            <CardMedia 
            className={classes.media}
             //these images are just placeholders for now
            image="https://i.pinimg.com/originals/8b/f0/76/8bf07692b7f9704f1b3552943bdcf1cd.jpg"
            title="Fast Food Training"
            />
            <CardContent className={classes.text}>
              <Typography gutterBottom variant="h6" component="h2">
              {course.name}
            </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                 {course.description}
              </Typography>
            </CardContent>

            <CardActions className= {classes.buttons}>
              <Link className={classes.underline} to={`/dashboard/${course._id}`}>
                <Button size="small">View Training</Button>
              </Link>
              <Button size="small" onClick={() => handleLaunchXR(course._id)}>Launch XR</Button>
            </CardActions>
            </CardActionArea>
          </Card>
          </Grid>
          
      </Grid>
    )
  }

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
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>
      </Box>

      <Box m={5}>
        {coursesState ?
          createTrainingModules()
          :
          <h1>LOADING</h1>
        }
      </Box>
    </Box>
  )
}