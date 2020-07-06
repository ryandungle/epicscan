import React from "react";
//redux
import { addPatient } from "../../../../redux/actions/dataActions";
import { useDispatch } from "react-redux";
//MUI stuff
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { auth } from "../../../../firebase";
const filter = createFilterOptions();

export default function PatientAutocomplete(props) {
  const dispatch = useDispatch();
  const addPatientsAction = () => dispatch(addPatient(dialogValue));
  const { optionList } = props;
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({
    FirstName: "",
    LastName: "",
    createAt: new Date().toISOString(),
    createdUserId: auth.currentUser.uid,
  });

  const handleClose = () => {
    addPatientsAction();
    toggleOpen(false);
    setDialogValue({
      FirstName: "",
      LastName: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      ...dialogValue,
      name: dialogValue.FirstName + " " + dialogValue.LastName,
      FirstName: dialogValue.FirstName,
      LastName: dialogValue.LastName,
    });

    handleClose();
  };

  const onChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          ...dialogValue,
          FirstName: newValue,
          LastName: "",
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({
        ...dialogValue,
        FirstName: newValue.inputValue,
        LastName: "",
      });
    } else {
      setValue(newValue);
    }
  };
  return (
    <>
      <Autocomplete
        value={value}
        onChange={onChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        autoComplete="new-password"
        options={optionList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            autoComplete="new-password"
            label="Patient"
            variant="outlined"
          />
        )}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new patient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="FirstName"
            value={dialogValue.FirstName}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                FirstName: event.target.value,
              })
            }
            label="First Name"
            type="text"
            fullWidth
          />

          <TextField
            fullWidth
            id="LastName"
            value={dialogValue.LastName}
            onChange={(event) =>
              setDialogValue({ ...dialogValue, LastName: event.target.value })
            }
            label="Last Name"
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
