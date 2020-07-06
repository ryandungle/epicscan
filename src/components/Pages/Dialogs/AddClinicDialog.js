import React, { useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { addClinic } from "../../../redux/actions/dataActions";
import { useForm } from "../../../utils/hooks";

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

export default function AddClinicDialog() {
  const [open, setOpen] = useState(false);
  const clinics = useSelector((state) => state.data.clinics);
  const dispatch = useDispatch();
  const addClinicAction = (clinic) => addClinic(clinic)(dispatch);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clinic = {
    name: "",
    address: "",
    specialty: "",
    createdAt: new Date().toISOString(),
  };
  const { values, onChange, onSubmit } = useForm(handleDataSubmit, clinic);

  function handleDataSubmit() {
    (() => {
      addClinicAction(values);
      handleClose();
    })();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Clinic
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Clinic</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Clinic info</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Clinic Name"
            type="text"
            onChange={onChange}
            value={values.name}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            name="address"
            label="Clinic Address"
            onChange={onChange}
            value={values.address}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="specialty"
            label="Specialty"
            onChange={onChange}
            value={values.specialty}
            type="text"
            fullWidth
          />
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
