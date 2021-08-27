import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider, Card, CardContent, CardActions, Paper, Grid, makeStyles } from "@material-ui/core";

import Ingredient from "./ingredient"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const insertIntoArray = (list, value, index) => {
  list.splice(list, index, value);
};

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
})


export default function RecipeBuilder(props) {
  const ingredients = [
    { id: "top_bun", value: "Top Bun", src: "https://www.metro.ca/userfiles/image/infographics/images/burgers/5-COWBOY/5-Cowboy-Bun-Top.png" },
    { id: "bottom_bun", value: "Bottom Bun", src: "https://png.pngitem.com/pimgs/s/344-3449103_bun-bread-bottom-hd-png-download.png" },
    { id: "patty", value: "Patty", src: "https://image.shutterstock.com/image-photo/single-grilled-hamburger-patty-isolated-260nw-534672568.jpg" },
    { id: "lettuce", value: "Lettuce", src: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg" },
    { id: "cheese", value: "Cheese", src: "https://qph.fs.quoracdn.net/main-qimg-fa4e8f9efa8f3ca480f03b93bb3e9b58" },
    { id: "sauce", value: "Tomato Sauce", src: "https://pngimg.com/uploads/sauce/sauce_PNG72.png" },
    { id: "tomato", value: "Tomato", src: "https://s3.envato.com/files/250360646/DSC_0674.jpg" }
  ];

  const [state, setState] = useState([]);
  const [itemCount, setItemCount] = useState(props.ingredients ? props.ingredients.length + 1 : 1);

  useEffect(() => {
    var counter = 0;
    props.ingredients.forEach((x, inde) => {
      var ingredient = ingredients.find(y => x == y.id);
      ingredient = { ...ingredient, id: `${ingredient.id}-${inde}`, unity_id: ingredient.id };
      state.push(ingredient);
    });
    setState(state);
    setItemCount(state.length);
  }, []);

  const onSetState = (state) => {
    if (props.onChange) {
      props.onChange(state.map(x => x.unity_id));
    }
    setState(state);
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      if (result.source.droppableId == "recipe") {
        state.splice(result.source.index, 1);
        onSetState(state);
        state.map(x => x.unity_id)
      }
      return;
    }

    if (result.source.droppableId == "ingredients" && result.destination.droppableId == "recipe") {
      const ingr = { ...ingredients[result.source.index] };
      setItemCount(itemCount + 1);
      ingr.unity_id = ingr.id
      const someRandomNum = Math.floor(Math.random() * 69420);
      ingr.id = `${ingr.id}-${itemCount}-${someRandomNum}`
      state.splice(result.destination.index, 0, ingr);
      onSetState(state);
    }
    else if (result.source.droppableId == "recipe" && result.destination.droppableId == "recipe") {
      var newOrder = reorder(state, result.source.index, result.destination.index)
      onSetState(newOrder);
    }
    console.log(state);
  }

  const classes = useStyles();

  return (
    state && (
      // <Box mx={50}
      //   style={{
      //     "min-height": "70vh",
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'center'
      //   }}>
      //   <Grid container spacing={2}>
      //     <DragDropContext onDragEnd={onDragEnd}>
      //       <Grid item style={{ flex: 0.3 }}>
      //         {(props.edit == undefined || props.edit) &&
      //           <Droppable droppableId="ingredients" isDropDisabled={true}>
      //             {(provided, snapshot) => (
      //               <Grid
      //                 {...provided.droppableProps}
      //                 ref={provided.innerRef}
      //                 container
      //                 direction="column"
      //                 alignItems="center"
      //                 justify="center"
      //               >
                      
      //                 {ingredients.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} />)}
      //                 {provided.placeholder}
                      
      //               </Grid >
      //             )}
      //           </Droppable>
      //         }
      //       </Grid>

      //       <Grid item style={{ flex: 1 }}>
      //         <Typography variant='h4' align="center">
      //           Recipe Ingredients
      //         </Typography>
      //         <Box my={3}>
      //           <Droppable droppableId="recipe" draggable={false}>
      //             {(provided, snapshot) => (
      //               <Paper
      //                 style={{
      //                   display: 'flex',
      //                   justifyContent: 'center',
      //                   alignItems: 'center'
      //                 }}
      //                 elevation={3}>
      //                 <Grid
      //                   {...provided.droppableProps}
      //                   ref={provided.innerRef}
      //                   isDraggingOver={snapshot.isDraggingOver}
      //                   container
      //                   direction="column"
      //                   alignItems="center"
      //                   justify="center"
      //                 >
      //                   {state && state.length > 0
      //                     ? state.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} edit={props.edit} />)
      //                     : <Typography variant='h6' justify="center">
      //                       Drop ingredients here
      //                     </Typography>
      //                   }
      //                   {provided.placeholder}
      //                 </Grid>
      //               </Paper>
      //             )}
      //           </Droppable>
      //         </Box>
      //       </Grid>
      //     </DragDropContext>
      //   </Grid>
      // </Box > 

      <div>
          <Grid container spacing={2}>
          <DragDropContext onDragEnd={onDragEnd}>

            {/* ingredients list to choose from*/}
            <Grid item style={{ flex: 0.3}}>
              {(props.edit == undefined || props.edit) &&
                <Droppable droppableId="ingredients" isDropDisabled={true}>
                  {(provided, snapshot) => (
                    <Grid container direction="column">
                      <Typography className={classes.bold} variant='h6'>
                        Ingredients
                      </Typography>
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{display:'grid', gridTemplateColumns: 'auto auto', gap: '18px'}}
                        container
                        //direction="row"
                        alignItems="center"
                        justify="center"                       
                      >
                        {ingredients.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} />)}
                        {provided.placeholder}
                      </Grid>
                    </Grid>
                  )}
                </Droppable>
              }
            </Grid>

            {/* Recipe ingredients selected */}
            <Grid item style={{ flex: 1 }}>
              <Typography variant='h4' align="center">
                Recipe Ingredients
              </Typography>
              <div style={{padding: 18}}>
                <Droppable droppableId="recipe" draggable={false}>
                  {(provided, snapshot) => (
                    <Paper
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15
                      }}
                      elevation={3}> 
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        style={{display:'grid', gridTemplateColumns: 'auto auto', gap: '18px'}}
                        container
                        //direction="column"
                        alignItems="center"
                        justify="center"
                      >
                        {state && state.length > 0
                          ? state.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} edit={props.edit} />)
                          : <Typography variant='h6' justify="center">
                            Drop ingredients here
                          </Typography>
                        }
                        {provided.placeholder}
                      </Grid>
                    </Paper>
                  )}
                </Droppable>
              </div>
            </Grid>

          </DragDropContext>
          </Grid>
      </div>
    )
  );
}