import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider, Card, CardContent, CardActions, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function Ingredient(props) {
	return (
		<Draggable key={props.ingredient.id} draggableId={props.ingredient.id} index={props.index} isDragDisabled={!(props.edit == undefined || props.edit)}>
			{(provided) => (
				<Box my={1}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<Paper>
						<Card variant="outlined"
							style={{ width: "14vw", height: "7.2vw" }} //14vw 7.2vw
						>
							<CardContent>
								<TableRow>
									<TableCell>
										<Typography color="textSecondary" align="center" gutterBottom>
									{props.ingredient.value}
									</Typography>
									</TableCell>
									<TableCell>
										<img
										style={{
											"max-width":"120%", //120
											"max-height":"120%" //120
										}}
										srcset={props.ingredient.src} />
									</TableCell>
								</TableRow>
							</CardContent>
						</Card>
					</Paper>
				</Box>
			)}
		</Draggable>
	);
}