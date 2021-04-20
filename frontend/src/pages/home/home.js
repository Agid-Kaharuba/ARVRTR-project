import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Grid, Container, Button, Typography, Paper, Avatar } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES
import VRLogo from '../../images/vr-glasses-white.png';
import bbt from '../../images/bbt.jpg';
import burger from '../../images/burger2.jpg';
import pizza from '../../images/pizza2.jpg';
import Andrew from '../../images/profile-photos/andrew-do.jpg';
import Vanisha from '../../images/profile-photos/vanisha-singh.png';
import Andy from '../../images/profile-photos/andy-le.jpg';
import Agid from '../../images/profile-photos/agid-kaharuba.png';
import Mitchell from '../../images/profile-photos/mitchell-murphy.png';
import Herrick from '../../images/profile-photos/herrick-feng.jpg';
import Bryan from '../../images/profile-photos/bryan-dinh.png';
import Kelvin from '../../images/profile-photos/kelvin-luong.jpg';
import Calvin from '../../images/profile-photos/calvin-dong.jpg';
import Brendon from '../../images/profile-photos/brendon-tong.png';
import Lakshva from '../../images/profile-photos/lakshva-sharma.jpg';

// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const profileStyles = makeStyles((theme) =>  ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function HomePage() {
  const history = useHistory();
//   const { authState, setAuthState } = React.useContext(AuthContext);
  const profiles = profileStyles();
//   if (authState.authenticated) {
//     return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
//   } else {
    return (

        <Grid 
            container
            spacing={2}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ minHeight: '100vh', backgroundImage: "linear-gradient(45deg, #662D8C  10%, #ED1E79)"}}>
              
            <Grid item>
              <img src={VRLogo} width='200' height='200'/>
            </Grid>  
            <Grid item>
              <WhiteTextTypography variant='h3'>
                <Box style={{fontWeight: '600', letterSpacing:6}} display='inline'> XR TRAINING EXPERIENCE</Box>
              </WhiteTextTypography>
            </Grid>

            <Grid item>
              <WhiteTextTypography variant='h5'>
                <Box display='inline'>
                  A virtual and augmented reality training experience.
                </Box>
              </WhiteTextTypography>
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary' onClick={()=>history.push('/login')}>
                Get Started!
              </Button>
            </Grid>
            <br></br>
            <Grid container direction="row" justify="space-around" alignItems="center" >
              <img src={bbt} width='25%' height='20%'/>
              <img src={burger} width='25%' height='20%'/>
              <img src={pizza} width='25%' height='20%'/>
            </Grid>
            <br></br>
            <Grid container direction="column" color='white' alignItems='flex-start'>
            <Container>
              <Box color="white">
            <h2>Project Outline</h2>

            <p>The Virtual Organizational Training Experience is focusing on large corporate organizations that are looking to improve their training experience. 
              The training experience is envisioned to eventually become a platform where companies can create their own XR training modules however, due to the time constraints
               of Software Studio 3A/3B, we will focus on creating the webapp component of the product, and one specific training scenario (as an example) for now. </p>
            
            <p>Our team's objective is:
              <ul>
                <li>Create an example of an immersive training experience module in XR </li>
                <li>Expandable for use as a platform to create training modules</li>
                <li>Create a webapp that links into the XR modules so users can access them and be assessed </li>
              </ul>
            </p>

            <h4>User Stories</h4>
            <ul>
              <li>Supervisor</li>
                <ul>
                  <li>As a supervisor, I would like to be able to create viewable training modules so that employees can easily know what they need to learn. </li>
                  <li>As a supervisor, I want to create tasks for employees so that I can instruct the employees for the things they need to learn. </li>
                  <li>As a supervisor, I want to have our own company subdivision so that I can choose what features and create training modules specifically for our company. </li>
                  <li>As a supervisor, I want the system to have checkpoints so that I can mark the employee training. </li>
                  <li>As a supervisor, I want to have a grading system so that I can determine if the employee has passed the training. </li>
                  <li>As a supervisor, I want to create my own XR training course without any technical expertise so that I can easily tailor the training experience to what I want. </li>
                  <li>As a supervisor, I want to view an employee training session by video footage so that I can assess and review the employee. </li> 
                </ul>

              <li>Employee</li>
                <ul>
                  <li>As a user, I want to sign up and login so that I can have access and use the platform. </li>
                  <li>As an employee, I want to have an engaging interaction with the XR training session so that I have a good and beneficial training experience. </li>
                  <li>As an employee, I want the system to store my statistics from training sessions so that I can have information about my performance. </li>
                  <li>As an employee, I want to view my statistics so that I can review my training session. </li>
                  <li>As an employee, I want to see my training completion progress so that I can see how well I am progressing with my training. </li>
                </ul>
            </ul>

            <h2>Storing Information</h2>
            <p>
            This system employs a database using MongoDB to store supervisor and employee information, including their credentials for authentication and recording. 
            </p>

            <h2>Team Communication</h2>
            <p>
              All tasks were split and assigned to team members on Trello so that it was always transparent which tasks were being worked on, have been completed or still required additional progress.  
            </p>
            <p>
              Microsoft Teams was the main form of communication used for collaborating and holding meetings, while Facebook Messenger was used for general communication. 
              The code for this project can be found at our <a href="https://github.com/Agid-Kaharuba/2021_SES3A_TEAM1">GitHub repository</a>.
            </p>
              </Box>
              </Container>
            </Grid>
            <Box color='white'> 
            <h2>
              Team Structure
            </h2>
            </Box>
            <Box mt={6}>
              <Grid
                container
                spacing={4}
                direction='row'
                alignItems='center'
                justify='center'>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Andrew} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem' }}>Andrew Do</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Co-Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Vanisha} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Vanisha Singh</WhiteTextTypography>
                    <WhiteTextTypography>UI/UX Design Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Andy} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Andy Lee</WhiteTextTypography>
                    <WhiteTextTypography>Unity Dev / Scrum Master</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Agid} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Agid Kaharuba</WhiteTextTypography>
                    <WhiteTextTypography>Unity/XR Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Mitchell} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Mitchell Murphy</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Herrick} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Herrick Feng</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Co-Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box m={6}>
              <Grid
                container
                spacing={4}
                direction='row'
                alignItems='center'
                justify='center'>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Bryan} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Bryan Dinh</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Kelvin} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Kelvin Luong</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Brendon} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Brendon Tong</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Calvin} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Calvin Dong</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Lakshva} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Lakshva Sharma</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
              </Grid>

            </Box>

        </Grid>

    )
//   }
}