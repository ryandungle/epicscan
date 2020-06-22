import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "../../../utils/hooks";
import { firestore, auth } from "../../../firebase";

//Redux
import { useSelector, useDispatch } from "react-redux";
//MUI stuff
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../Loader";
import { SET_PATIENTS } from "../../../redux/types";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: 0,
    width: "100%",
  },
  formWrap: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export default function AddPatientDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const patient = {
    DOB: "",
    createdAt: new Date().toISOString(),
    createdUserId: auth.currentUser.uid,
  };

  const handleDataSubmit = () => {
    firestore
      .collection("patients")
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        dispatch({
          type: SET_PATIENTS,
          payload: {
            pId: ref.id,
            name: values.FirstName + " " + values.LastName,
          },
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { values, onChange, handleDateChange, onSubmit } = useForm(
    handleDataSubmit,
    patient
  );
  const dialogMarkup = data.loading ? (
    <Loader />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={7}>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          value={values.FirstName}
          name="FirstName"
          onChange={onChange}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          value={values.LastName}
          name="LastName"
          onChange={onChange}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="physician"
          label="Physician"
          value={values.Physician}
          name="Physician"
          onChange={onChange}
          type="text"
          fullWidth
        />
        <FormControl component="fieldset" margin="dense">
          <FormLabel component="legend">Ethnicity</FormLabel>
          <RadioGroup
            aria-label="ethnicity"
            name="ethnicity"
            value={values.Ethnicity}
            onChange={onChange}
          >
            <FormControlLabel
              value="Hispanic"
              control={<Radio />}
              label="Hispanic"
            />
            <FormControlLabel
              value="Black"
              control={<Radio />}
              label="Black or African American"
            />
            <FormControlLabel
              value="Caucasian"
              control={<Radio />}
              label="Caucasian"
            />
            <FormControlLabel
              value="NativeAmerican"
              control={<Radio />}
              label="American Indian or Alaskan Native"
            />
            <FormControlLabel value="Asian" control={<Radio />} label="Asian" />
            <FormControlLabel
              value="NativeHawailian"
              control={<Radio />}
              label="Native Hawailian or Other Pacific Islander"
            />
          </RadioGroup>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            format="MM/dd/yyyy"
            variant="inline"
            margin="normal"
            id="date-picker-inline"
            label="DOB"
            value={values.DOB}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          margin="dense"
          id="email"
          value={values.Email}
          name="Email"
          onChange={onChange}
          label="Email"
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="phoneNumber"
          label="Phone Number"
          value={values.Phone}
          name="Phone"
          onChange={onChange}
          type="text"
          fullWidth
        />
      </Grid>
    </Grid>
  );
  return (
    <>
      <Button onClick={handleClickOpen} variant="contained" color="secondary">
        Add Patient
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Add Patient</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
