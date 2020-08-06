import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CardMedia } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

//redux stuff
import { getPatients, getBodyParts } from "../../../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
//custom Component
import PatientAutocomplete from "./components/PatientAutocomplete";
import BodyPartAutocomplete from "./components/BodypartAutocomplete";
import InputBoxArray from "./components/InputBoxArray";

const filter = createFilterOptions();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Epicscan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "md",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function TransactionsPage() {
  const patients = useSelector((state) => state.data.patients);
  const bodyparts = useSelector((state) => state.data.bodyparts);
  const classes = useStyles();
  const [ShowComponent, setShowComponent] = React.useState({
    BodyPartPhoto: {},
    BothSideSwitch: false,
  });
  const [openPatientDialog, toggleOpenPatientDialog] = React.useState(false);
  const [patientDialogValue, setPatientDialogValue] = React.useState({});

  const enableBothSide = (event) => {
    setShowComponent({
      ...ShowComponent,
      BothSideSwitch: event.target.checked,
    });
  };

  const [opentBodyPartDialog, toggleOpentBodyPartDialog] = React.useState(
    false
  );
  const [BodyPartDialogValue, setBodyPartDialogValue] = React.useState({});

  const dispatch = useDispatch();
  const getPatientsAction = () => dispatch(getPatients());
  const getBodyPartsAction = () => getBodyParts()(dispatch);

  useEffect(() => {
    getPatientsAction();
    getBodyPartsAction();
  }, []);

  const handleClosePatientDialog = (value) => {
    setPatientDialogValue(value);
    toggleOpenPatientDialog(false);
  };
  const handleCloseBodyPartDialog = (value) => {
    if (value) {
      setBodyPartDialogValue(value);
    }
    toggleOpentBodyPartDialog(false);
  };

  const handleClick = () => {
    console.log(BodyPartDialogValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const onClick = () => {
    console.log(bodyparts);
  };

  const handleOnchange = (data) => {
    if (!data) return;
    setShowComponent({
      ...ShowComponent,
      imageURL: data.imageURL,
    });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add new sample
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PatientAutocomplete optionList={patients} />
              </Grid>
              <Grid item xs={12}>
                <BodyPartAutocomplete
                  optionList={bodyparts}
                  SelectedValue={handleOnchange}
                />
              </Grid>

              {ShowComponent.imageURL && (
                <Grid item xs={12}>
                  <CardMedia
                    component="img"
                    alt={ShowComponent.name}
                    image={ShowComponent.imageURL}
                    title={ShowComponent.name}
                  />
                </Grid>
              )}
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                minDate={new Date()}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Reading Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={ShowComponent.BothSideSwitch}
                    onChange={enableBothSide}
                    name="BothSide"
                    color="primary"
                  />
                }
                label="Both side"
              />
            </Grid>
          </form>
        </div>
      </Container>
      <Container className={classes.root}>
        <div className={classes.paper}>
          <form>
            

            <InputBoxArray FieldNumber={18} GroupName="Left Side" />
            {ShowComponent.BothSideSwitch && (
              <InputBoxArray FieldNumber={18} GroupName="Right Side" />
            )}

            {/* {Array(18).fill(
              <TextField
                label="Required"
                defaultValue="Hello World"
                variant="outlined"
              />
            )} */}
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Add sample
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Test data
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
