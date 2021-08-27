import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Grid, FormControl, Select, MenuItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import Recipe from "../../../components/Recipe"

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
  formControl: {
    margin: 2,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 2,
  },
})

export default function CreateNewRecipePage() {
  const classes = useStyles();

  const [formState, setFormState] = useState({ category: "", name: "", ingredients: ["top_bun", "bottom_bun"] });

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
    try {
      const res = await api.recipe.create(authState.token, formState);
      history.push(`/recipe/${res.data._id}`);
    }
    catch (err) {
      // TODO: api call failed alert user
      console.log(err);
    }
  }

  return (
    <>
      <Box m={5}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Create Recipe
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
      </Box>

      <Recipe recipeState={formState} handleChange={handleChange} editState={true} />

      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained" color="secondary" component={Link} to="/recipe">
            Back
        </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
        </Button>
        </Box>
      </Box>
    </>
  )
}