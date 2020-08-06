import React, { useState } from "react";
//redux
import { addPatient, addBodyPart } from "../../../../redux/actions/dataActions";
import { useDispatch } from "react-redux";
//MUI stuff
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { auth } from "../../../../firebase";

import {
  Grid,
  Typography,
  Box,
  Fade,
  CircularProgress,
  Badge,
  Avatar,
  Fab,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
  TextField,
  Tooltip,
  IconButton,
  Divider,
  CardMedia,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  Photo as PhotoIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  PersonOutline as PersonOutlineIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  AccessTime as AccessTimeIcon,
  DeleteForever as DeleteForeverIcon,
} from "@material-ui/icons";
const filter = createFilterOptions();
export default function BodyPartAutocomplete(props) {
  const dispatch = useDispatch();
  const addBodyPartAction = () => dispatch(addBodyPart(dialogValue));
  const { optionList } = props;
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const initDialogValue = {
    name: "",
    imageURL: "",
    createAt: new Date().toISOString(),
    createdUserId: auth.currentUser.uid,
  };
  const [dialogValue, setDialogValue] = React.useState(initDialogValue);

  const [UI, setUI] = useState({
    performingAction: false,
    loadingImg: false,
  });

  const handleClose = () => {
    setDialogValue(initDialogValue);
    toggleOpen(false);
  };

  const handleSubmit = () => {
    setValue({
      ...dialogValue,
      name: dialogValue.name,
      imageURL: dialogValue.imageURL,
    });
    addBodyPartAction();
    toggleOpen(false);
    setDialogValue(initDialogValue);
  };

  const handleImageChange = (event) => {
    if (!event) {
      return;
    }
    const files = event.target.files;
    if (!files) {
      return;
    }
    const img = files[0];
    if (!img) {
      return;
    }
    const fileTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];
    if (!fileTypes.includes(img.type)) {
      return;
    }
    setDialogValue({
      ...dialogValue,
      img,
      imageURL: URL.createObjectURL(img),
    });
  };

  const onClick = () => {
    console.log(console.log(value));
  };

  const onChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          ...dialogValue,
          name: newValue,
          imageURL: "",
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({
        ...dialogValue,
        name: newValue.inputValue,
        imageURL: "",
      });
    } else {
      setValue(newValue);
      props.SelectedValue(newValue);
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
            label="Body Part"
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
        <DialogTitle id="form-dialog-title">Add Body Part</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="name"
                value={dialogValue.name}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    name: event.target.value,
                  })
                }
                label="name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input
                id="image-input"
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />

              <label htmlFor="image-input">
                <Button
                  color="primary"
                  component="span"
                  startIcon={<PhotoIcon />}
                  variant="contained"
                >
                  Choose image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              {dialogValue.imageURL && (
                <CardMedia
                  component="img"
                  alt={dialogValue.name}
                  image={dialogValue.imageURL}
                  title={dialogValue.name}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
          <Button onClick={onClick} color="primary">
            Test
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
