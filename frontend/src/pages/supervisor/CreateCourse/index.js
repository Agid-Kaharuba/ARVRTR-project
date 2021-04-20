import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";


const useStyles = makeStyles({
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
})

function createData(name, description, duration, task) {
  return { name, description, duration, task };
}

const rows = [
  createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10, 0),
  createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20, 0),
  createData('Task 3', 'Learn the safety terminology', 5, 0),
];

export default function CreateNewTrainingPage() {
  const classes = useStyles();
  const [formState, setFormState] = useState({name: "", description: ""});
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
    event.preventDefault();
    console.log(formState);
    api.course.create(authState.token, formState);
    history.push('/dashboard');
  }

  return (
    <div>
      <Box m={5}>
        <Typography className={classes.bold} variant='h4'>
          Create New Training
        </Typography>
        <Divider variant="middle" />
      </Box>

      {/* https://www.npmjs.com/package/material-ui-dropzone */}
      <Box m={5}>
        <Box m={2}>
          <Typography variant='h5'>
            Upload Training Photo
          </Typography>
        </Box>

        <DropzoneArea />
        <Box m={2}>
          <Button variant="contained" component="label">
            Upload Photo
            <input type="file" hidden />
          </Button>
        </Box>
      </Box>

      <Box m={5}>
        <Box m={2}>
          <Typography variant='h5'>
            Training Details
          </Typography>
        </Box>

        <Box m={2}>
          <TextField
            id="filled-multiline-static"
            label="Enter the Training's Name"
            fullWidth='true'
            variant="filled"
            name="name"
            onChange={handleChange}
          />
        </Box>
        <Box m={2}>
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
      </Box>

      <Box m={5}>
        <Typography className={classes.bold} variant='h5'>
          Tasks
        </Typography>
        <Divider variant="middle" />
      </Box>

      <Box m={5}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="left">View Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.duration}</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained" color="secondary" component={Link} to="/dashboard">
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </div>
  )
}