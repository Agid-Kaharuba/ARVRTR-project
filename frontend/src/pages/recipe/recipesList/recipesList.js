import React, { useState, useEffect, useContext } from "react";
import Recipes from "../../../components/Recipe/list.js";
import { Button, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecoration: 'none'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650,
  },
})

export default function RecipesList() {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [recipesState, setRecipesState] = useState(undefined);

  const fetchData = async () => {
    const res = await api.recipe.getAll(authState.token);
    setRecipesState(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    if (recipesState === undefined) {
      fetchData();
    }
  });

  return (
    <>
      <Box m={5}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Recipes
            </Typography>
          </Grid>
          <Grid item align="right">
            <Button variant="contained" color="primary" component={Link} to={"/recipe/create"}>Create Recipe</Button>
          </Grid>
        </Grid>
        <Divider variant="middle" />
      </Box>
      <Recipes recipesState={recipesState} />
    </>
  );

}