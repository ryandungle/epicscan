import React, { useState, useEffect } from "react";
//Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getClinics, addPhysician } from "../../../redux/actions/dataActions";

//MUI stuff
import {
  MenuItem,
  InputLabel,
  Select,
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddClinicDialog from "./AddClinicDialog";
import { useForm } from "../../../utils/hooks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: 0,
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formWrap: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export default function AddPhysicianDialog() {
  const classes = useStyles();
  const clinics = useSelector((state) => state.data.clinics);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const getClinicsAction = () => dispatch(getClinics());
  const addPhysicianAction = (physician) => dispatch(addPhysician(physician));

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getClinicsAction();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const physician = {
    name: "",
    phone: "",
    email: "",
    npi: "",
    clinicId: "",
    createdAt: new Date().toISOString(),
  };
  const { values, onChange, onSubmit } = useForm(handleDataSubmit, physician);

  function handleDataSubmit() {
    (() => {
      addPhysicianAction(values);
      handleClose();
    })();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Physician
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        noValidate
        autoComplete="off"
      >
        <DialogTitle id="form-dialog-title">Add Physician</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Physician info</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            value={values.name}
            onChange={onChange}
            label="Physician Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={onChange}
            label="Phone"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            value={values.email}
            onChange={onChange}
            label="email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="npi"
            name="npi"
            value={values.npi}
            onChange={onChange}
            label="NPI"
            type="text"
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">CLinic</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="clinicId"
              value={values.clinicId}
              onChange={onChange}
            >
              {clinics.map((item) => (
                <MenuItem value={item.clinicId}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <AddClinicDialog />
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
    </div>
  );
}
