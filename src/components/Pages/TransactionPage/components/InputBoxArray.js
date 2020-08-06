import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import validate from "validate.js";

export default function InputBoxArray(props) {
  const { FieldNumber, GroupName } = props;
  const errors = { error: false, helperText: "" };

  const [Errors, setErrors] = useState(errors);
  let output = [];
  for (let i = 0; i < FieldNumber; i++) {
    output.push(<TextField label={`Value ${i + 1}`} variant="outlined" />);
  }
  return (
    <div>
      <Typography component="h1" variant="h6">
        {GroupName}
      </Typography>
      {output}
    </div>
  );
}
