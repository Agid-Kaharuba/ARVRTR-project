import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Grid, Container, Typography, Paper, Avatar } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES

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
import MitchGif from '../../images/mitchellvr.gif';
import VanishaGif from '../../images/vanishavr.gif';
import BryanGif from '../../images/bryanvr.gif';
import Matthew from '../../images/profile-photos/matt.jpg';
import Vladimir from '../../images/profile-photos/vlad.jpg';
import BackButton from "../../components/backbutton";

// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  }
})(Typography);

const profileStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function AboutUsPage() {
  const history = useHistory();
  //   const { authState, setAuthState } = React.useContext(AuthContext);
  const profiles = profileStyles();
  //   if (authState.authenticated) {
  //     return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
  //   } else {
  return (
    // Orignial Gradient linear-gradient(45deg, #662D8C  10%, #ED1E79)
    <Grid
      container
      spacing={2}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh', backgroundImage: "linear-gradient(45deg, #662D8C  10%, #ED1E79)" }}>
      <Grid item>
        <br></br>
        <WhiteTextTypography variant='h3'>
          <Box style={{ fontWeight: '600', letterSpacing: 6 }} display='inline'> About Us</Box>
        </WhiteTextTypography>
      </Grid>
      <Grid container direction="column" alignItems='flex-start'>
        <Container>
          <Box style={{ fontSize: '24px', fontFamily: 'Roboto', color: "white" }}>
            <h2>Project Outline</h2>

            <p>The Virtual Organizational Training Experience is focusing on large corporate organizations that are looking to improve their training experience.
            The training experience is envisioned to eventually become a platform where companies can create their own XR training modules however, due to the time constraints
           of Software Studio 3A/3B, we will focus on creating the webapp component of the product, and one specific training scenario which is burger training for now. </p>

            <p>Our team's objective is:
          <ul>
                <li>Create an example of an immersive training experience module in XR </li>
                <li>Expandable for use as a platform to create training modules</li>
                <li>Create a webapp that links into the XR modules so users can access them and be assessed </li>
              </ul>
            </p>

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
        <Container>
          <Grid container alignItems="center" justify="center" direction='column'>
            <WhiteTextTypography>
              Customer Training
              </WhiteTextTypography>
            <Grid container alignItems="center" justify="space-around" direction='row'>
              <Grid alignItems="center" justify="center" direction='column'>
                <Box>
                  <img src={MitchGif}></img>
                </Box>
                <Box fontStyle="italic">
                  <WhiteTextTypography >- "Mitchell trying VR"</WhiteTextTypography>
                </Box>
              </Grid>
              <Box>
                <img src={VanishaGif}></img>
                <Box fontStyle="italic" >
                  <WhiteTextTypography>- "Vanisha trying VR"</WhiteTextTypography>
                </Box>
              </Box>
              <Box>
                <img src={BryanGif}></img>
                <Box fontStyle="italic">
                  <WhiteTextTypography>- "Bryan trying VR"</WhiteTextTypography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Grid>
      <Box style={{ fontSize: '24px', fontFamily: 'Roboto', color: "white" }}>
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
              <Avatar src={Andrew} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Na Tian</WhiteTextTypography>
              <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Vanisha} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Vanisha Singh</WhiteTextTypography>
              <WhiteTextTypography>UI/UX Design Lead</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Andy} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Andy Lee</WhiteTextTypography>
              <WhiteTextTypography>Unity Dev / Scrum Master</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Matthew} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Matthew Barrett</WhiteTextTypography>
              <WhiteTextTypography>Unity Lead</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Mitchell} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Mitchell Murphy</WhiteTextTypography>
              <WhiteTextTypography>Back-End Lead</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Herrick} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Herrick Feng</WhiteTextTypography>
              <WhiteTextTypography>Front-End Lead</WhiteTextTypography>
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
              <Avatar src={Bryan} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Bryan Dinh</WhiteTextTypography>
              <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Kelvin} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Kelvin Luong</WhiteTextTypography>
              <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Brendon} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Brendon Tong</WhiteTextTypography>
              <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Calvin} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Calvin Dong</WhiteTextTypography>
              <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Lakshva} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Lakshya Sharma</WhiteTextTypography>
              <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Vladimir} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Vladimir Poshevelya</WhiteTextTypography>
              <WhiteTextTypography>Unity Developer</WhiteTextTypography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Avatar src={Agid} className={profiles.large} />
              <WhiteTextTypography style={{ fontWeight: '600', fontSize: '1.2rem' }}>Agid Kaharuba</WhiteTextTypography>
              <WhiteTextTypography>Unity Developer</WhiteTextTypography>
            </Grid>
          </Grid>
        </Grid>

      </Box>

    </Grid>

  )
  //   }
}
