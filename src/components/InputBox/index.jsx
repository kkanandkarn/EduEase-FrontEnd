import { TextField } from "@mui/material";
import React from "react";

const InputBox = ({
  error,
  helperText,
  required = false,
  id,
  label,
  name,
  autoComplete = "off",
  autoFocus = false,
  value,
  onChange,
  inputProps = {},
  multiline = false,
  disabled = false,
  type = "text",
}) => {
  return (
    <div>
      <TextField
        type={type}
        error={error}
        helperText={helperText}
        margin="normal"
        required={required}
        fullWidth
        id={id}
        label={label}
        name={name}
        autoComplete="new-password"
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        InputProps={{
          ...inputProps,
          autocomplete: "new-password",
          form: {
            autocomplete: "off",
          },
        }}
        multiline={multiline}
        disabled={disabled}
      />
    </div>
  );
};

export default InputBox;
