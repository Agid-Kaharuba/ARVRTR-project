import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Typography, Divider, Box, FormControl, Select, MenuItem, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import ViewRecipeSup from "../../../components/viewRecipes/viewRecipesSup";
import ViewRecipeEmp from "../../../components/viewRecipes/viewRecipesEmp";
import Recipe from "../../../components/Recipe";

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


export default function ViewRecipe(props) {
  const recipeId = props.match.params.recipeId;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [recipeState, setRecipeState] = useState(undefined);
  const [editState, setEditState] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRecipeState({ ...recipeState, [id]: value })
    console.log(recipeState);
  }

  const handleEdit = async (e) => {
    //Set editState to enable if user is an employee
    //Update if button is selected
    if (!editState) {
      console.log("Updating", recipeState)
      try {
        const res = await api.recipe.update(authState.token, recipeId, recipeState);
        console.log(res);
      }
      catch (err) {
        console.log(err);
      }
    }
    setEditState(!editState);
  }

  const fetchData = async () => {
    const res = await api.recipe.get(authState.token, recipeId);
    console.log(res.data);
    setRecipeState(res.data);
  };

  useEffect(() => {
    if (recipeState === undefined) {
      fetchData();
    }
  });
  if (recipeState === undefined) {
    // TODO: add loader
    return (<h1>LOADING</h1>)
  }
  else {
    return (
      <>
        <Box m={5}>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography className={classes.bold} variant='h4'>
                View Recipe
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
        </Box>

        <Recipe recipeState={recipeState} handleChange={handleChange} editState={!editState} />

        <Box justifyContent='center' display="flex" m={6}>
          <Box mr={6}>
            <Button variant="contained" color="secondary" component={Link} to="/recipe">
              Back
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              {editState ? "Edit" : "Save"}
            </Button>
          </Box>
        </Box>
      </>
    );
  }
}