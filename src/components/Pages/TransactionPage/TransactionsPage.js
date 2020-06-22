import "date-fns";
import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import AddPatientDialog from "../Dialogs/AddPatientDialog";

//redux stuff
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";
//MUI stuff
import { Grid, Fab, Box, TextField, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  Refresh as RefreshIcon,
  Home as HomeIcon,
  ColorLensTwoTone,
} from "@material-ui/icons";

import { firestore } from "../../../firebase";

import EmptyState from "../../EmptyState";

import Loader from "../../Loader";
import UserCard from "../../UserCard";

import { ReactComponent as ErrorIllustration } from "../../../illustrations/error.svg";
import { ReactComponent as NoDataIllustration } from "../../../illustrations/no-data.svg";

import { useForm } from "../../../utils/hooks";

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

function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [transDetails, setTransDetails] = useState({
    patientId: "",
    readingDate: "",
    bodyPart: "",
    oneSide: "",
    left: "",
    right: "",
    diagnosis: "",
  });
  const classes = useStyles();
  useEffect(() => {
    firestore
      .collection("patients")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const name = doc.data().FirstName + " " + doc.data().LastName;
          const patientItem = {
            pId: doc.id,
            name: name,
          };
          data.patients.push(patientItem);
        });
      });
    return () => {
      data.patients = [];
      console.log(data.patients);
    };
  }, [data.patients]);
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleSubmit = () => {
    dispatch({
      type: "SET_TRANSACTIONS",
      payload: transDetails,
    });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { values, onChange, onSubmit } = useForm(handleSubmit, transDetails);

  return (
    <Grid className={classes.grid} container spacing={5}>
      <Grid item xs={6}>
        <Paper className={classes.formWrap}>
          <form onSubmit={onSubmit}>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-Patient-Name"
                options={data.patients}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Patient Name"
                    variant="outlined"
                  />
                )}
              />
              <AddPatientDialog />
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-readingDate"
                label="Reading Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TransactionsPage;
