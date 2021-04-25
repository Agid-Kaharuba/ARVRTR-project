import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Box, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  function createData(name, description, duration, view) {
    return {name,description, duration, view};
  }

  //0 is a placeholder for the view button
  const rows = [
      createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10,0),
      createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20,0),
      createData('Task 3', 'Learn the safety terminology', 5,0)
  ];

export default function TasksList() {
    const classes = useStyles();

    return(
    <>
     <Box m={5}>
         {/* <TableContainer>
             <Table>
                
             </Table>
         </TableContainer> */}
         <Grid container spacing={2} justify="space-between">
            <Grid item>
                <Typography className={classes.bold} variant='h4'>
                Tasks
                </Typography>
            </Grid>
            <Grid item align="right">
                <Button size="small" variant="outlined" color="secondary">Add Task</Button>
            </Grid>
          </Grid>
        <Divider variant="middle" />
      </Box>

      <Box m={5}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.bold}>Name</TableCell>
                        <TableCell className={classes.bold}>Description</TableCell>
                        <TableCell className={classes.bold}>Duration</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">{row.duration}</TableCell>
                            <TableCell align="left">
                                <Button size="small" variant="outlined" color="secondary">View Task</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </>
    );

}