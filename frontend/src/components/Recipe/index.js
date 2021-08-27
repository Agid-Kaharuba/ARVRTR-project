import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Typography, Box, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RecipeBuilder from "./recipeBuilder";

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
  formControl: {
    minWidth: 200,
  },
})

export default function Recipe(props) {
  let history = useHistory();
  const { handleChange, editState, recipeState } = props;

  const onChangeIngredients = (ingredients) => {
    handleChange && handleChange({ target: { name: "ingredients", id: "ingredients", value: ingredients } });
  }

  const classes = useStyles();
  return (
    <>
      <Box m={5}>
        <Grid container spacing={20} direction="column" justify="space-between"
          style={{display:'grid', gridTemplateColumns: 'auto auto'}}>
          <Grid style={{width: "25vw"}}>
            <Typography className={classes.bold} variant='h6'>
              Name
            </Typography>
            <TextField value={recipeState.name} id="name" name="name" disabled={!editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
            <Typography className={classes.bold} variant='h6'>
              Category
            </Typography>
            {/* <TextField value={recipeState.category} id="category" name="category" disabled={!editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} /> */}
            <select name="category" id="category" onChange={handleChange} value={recipeState.category} disabled={!editState} style={{width: '25vw', height: '4vw', fontSize: '1.2vw'}}>
              <option> </option>
              <option value="Burger">Burger</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
            </select>
          </Grid>
          <Grid>
            <div>
              {/* <Paper elevation={3}> */}
                <RecipeBuilder edit={editState} ingredients={recipeState.ingredients} onChange={onChangeIngredients} />
              {/* </Paper> */}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}