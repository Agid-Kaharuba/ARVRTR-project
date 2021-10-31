import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, Divider, Box, Grid } from "@material-ui/core";
import { TableCell, TableHead, TableBody, Table, TableContainer, TableRow, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import { Recommendation } from "../../components/Recommendation"

import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import { SelectList } from "../../components/SelectList"

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  image: {
    height: "350px"
  },
  recommendationSection: {

  }
})

export default function ReportPage(props) {
  const userId = props.match.params.userId;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [userState, setUserState] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [trackingState, setTrackingState] = useState(undefined);
  const [selected, setSelected] = useState({ courseId: null, taskId: null, export: null });
  const [coursesState, setCoursesState] = useState(undefined);

  const fetchData = async () => {
    try {
      const res = (await api.user.get(authState.token, userId)).data;
      setUserState(res)
      setImg(await api.user.download(userId))
      const courses = (await api.course.getAllWith(authState.token, userId)).data
      setCoursesState(formatCourses(courses));
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (userState === undefined) {
      fetchData();
    }
  }, [userState]);

  const updateSelected = async (newSelected, id) => {
    const updated = selected;
    updated[id] = newSelected;

    if (updated.courseId && updated.taskId) {
      const url = api.progress.download(userId, updated.courseId)
      setSelected({ ...updated, export: url });
      var res = await api.progress.get(authState.token, userId, updated.taskId, updated.courseId);
      let trackingData = res?.data[0]?.tracking;
      if (!trackingData) {
        trackingData = [{ event: "Employee to complete task" }]
      }
      setTrackingState(trackingData);
    }
    else {
      setSelected({ ...updated });
    }
  }

  const formatCourses = (courses) => {
    const newCourses = courses.map((i) => {
      return {
        ...i,
        label: `${i.name}`,
        key: i._id,
        tasks: i.tasks.map((ii) => {
          return {
            ...ii,
            label: `${ii.name}`,
            key: ii._id
          }
        })
      }
    })
    console.log(newCourses);
    return newCourses;
  }

  const buildLogs = () => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell width="20%">Time</TableCell>
            <TableCell width="20%">Event</TableCell>
            <TableCell width="30%">Value</TableCell>
            <TableCell>Data</TableCell>
          </TableHead>
          <TableBody>
            {trackingState && (
              trackingState.map(tracking =>
                <TableRow>
                  <TableCell>{tracking.date ? (new Date(tracking.date)).toLocaleTimeString() : ''}</TableCell>
                  <TableCell>{tracking.event}</TableCell>
                  <TableCell>{tracking.value}</TableCell>
                  <TableCell>{JSON.stringify(tracking.data)}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>)
  }

  if (!userState || !img)
    return null;

  return (
    <>
      <Recommendation recommendation={"Fire"} />
      <Container maxWidth="lg">
        <Box m={5}>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography className={classes.bold} variant='h4'>
                Employee
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "32px" }}>
              <Typography className={classes.bold} variant='h6'>
                {userState.staffid} - {userState.firstname} {userState.lastname}
              </Typography>
              <br />
              <img src={img.data} className={classes.image} alt="profile image" />
            </div>
            <div>
              <Typography className={classes.bold} variant='h4'>
                Report Summary
              </Typography>
              <Divider />
              <p>
                Report Summary Test
              </p>
            </div>
          </div>
        </Box>
        <Box m={5}>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography className={classes.bold} variant='h4'>
                Performance Breakdown
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "32px", display: "flex" }}>
              <SelectList listOptions={coursesState} updateSelected={(key) => updateSelected(key, 'courseId')} selected={selected.courseId} />
              <SelectList listOptions={coursesState ? (coursesState.find(i => i._id == selected.courseId)?.tasks ?? []) : []} updateSelected={(key) => updateSelected(key, 'taskId')} selected={selected.taskId} />
            </div>
            <div style={{ width: '50%' }}>
              <Typography className={classes.bold} variant='h4'>
                Course Report
              </Typography>
              <Divider />
              {coursesState && selected.courseId && (<>
                <p>{coursesState.find(i => i._id === selected.courseId).name}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed aliquam orci, in malesuada enim. Sed eget diam a ante imperdiet bibendum. In hac habitasse platea dictumst. Integer efficitur iaculis sem sed ultricies. Aliquam erat volutpat. Vestibulum venenatis viverra sapien, in pretium diam luctus non. Integer lacinia nunc at feugiat efficitur. Nulla facilisi. Aliquam pretium sem convallis tellus cursus, sed suscipit orci dapibus. In finibus aliquam blandit.
                </p>
              </>)}
              <Typography className={classes.bold} variant='h4'>
                Task Report
              </Typography>
              <Divider />
              <p>
                Task Report Test
              </p>
            </div>
          </div>
          {buildLogs()}
        </Box>
      </Container>
    </>
  );
}