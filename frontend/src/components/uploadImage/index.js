
import React, { useState, useContext } from "react";
import { Button, TextField, Container, Typography, IconButton, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import api from '../../helpers/api'
import { AuthContext } from "../../context/auth";
import bbt from "../../images/bbt.jpg";
import burger from "../../images/burger.jpg";
import burger2 from "../../images/burger2.jpg";
import burger3 from "../../images/pizza.jpg";


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  changePswForm: {
    padding: "16px 24px",

  },
  textField: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  typography: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0.5)
  },
  profileImg: {
    position: "relative",
    alignSelf: "start"
  },
  image: {
    height: 150,
    width: 150,
    margin: theme.spacing(2),
  },
  imageUpload: {
    display: "none",
  },
  name: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2vw",
  },
  labelField: {
    marginTop: theme.spacing(3),
  },
  saveBtn: {
    marginTop: "32px",
    textAlign: "center"
  },
  imagedisplay: {
    display: "none",
    padding: "16px 24px",
  }
}));


function DialogTitle(props) {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

function ChangeImageDialog(props) {
  const classes = useStyles();
  const { onClose, open, imageChange, handleChange, saveChanges } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} disableBackdropClick disableEscapeKeyDown fullWidth="true" maxWidth="xs">
      <DialogTitle onClose={handleClose}>Choose a Image</DialogTitle>
      <form onSubmit={saveChanges} className={classes.changePswForm}>
        <Grid>
          <Button onClick={() => {imageChange(bbt); handleClose()}}>
            <img className={classes.image} src={bbt} alt="profile image" />
          </Button>
          <Button onClick={() =>{imageChange(burger); handleClose()}}>
            <img className={classes.image} src={burger} alt="profile image" />
          </Button>
          <Button onClick={() =>{imageChange(burger2); handleClose()}}>
            <img className={classes.image} src={burger2} alt="profile image" />
          </Button>
          <Button onClick={() =>{imageChange(burger3); handleClose()}}>
            <img className={classes.image} src={burger3} alt="profile image" />
          </Button>
        </Grid>
      </form>
    </Dialog>
  );
}

function UploadImage(props) {
  const classes = useStyles();
  // TODO: I dont know what these are for
  // There were declared before this component was pulled from being hardcoded in a page
  // Just propping them in for now.
  const { imagesrc, editState } = props;

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      {/*Accepting only files with image type*/}
      {/* <input type="file" id="input" accept="image/*" onChange={imagesrc} ref={imagesrc} className={classes.imageUpload} /> */}
      <div className={classes.profileImg}>
        <img className={classes.image} src={imagesrc} alt="placeholder image" />
      </div>
      <div>
        <Button onClick={handleDialogOpen} variant="outlined" color="secondary" className={editState ? classes.imagedisplay : classes.changePswForm}>Upload Image</Button>
        <ChangeImageDialog open={open} onClose={handleClose} {...props}></ChangeImageDialog>
      </div>
    </div>
  )
}



export default function PlaceholderImage(props) {
  const classes = useStyles();

  return (
    <div maxWidth="md">
      <div className={classes.container}>
        <UploadImage {...props} />
      </div>
    </div>
  )
}