import React, { useState } from "react";
import InputBox from "../../../components/InputBox";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Dropdown from "../../../components/Dropdown";

const Inputs = ({ formData, errors, handleChange, roles }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputs = [
    {
      error: !!errors.name,
      helperText: errors.name,
      required: true,
      id: "name",
      label: "Name",
      name: "name",
      autoFocus: true,
      value: formData.name,
      onChange: handleChange,
      placeholder: "Enter Name",
      inputProps: { maxLength: 100 },
    },
    {
      error: !!errors.email,
      helperText: errors.email,
      required: true,
      id: "email",
      label: "Email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      placeholder: "Enter Email",
      inputProps: { maxLength: 100 },
    },
    {
      error: !!errors.password,
      helperText: errors.password,
      required: true,
      type: showPassword ? "text" : "password",
      id: "password",
      label: "Password",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      placeholder: "Enter Password",
      inputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    {
      error: !!errors.contact,
      helperText: errors.contact,
      required: false,
      id: "contact",
      label: "Contact",
      name: "contact",
      value: formData.contact,
      onChange: handleChange,
      placeholder: "Enter Contact",
    },
    {
      required: false,
      id: "address",
      label: "Address",
      name: "address",
      value: formData.address,
      onChange: handleChange,
      placeholder: "Enter Address",
    },
  ];

  return (
    <div className="grid grid-cols-3 px-10 gap-4 mt-10">
      {inputs.map((input, index) => (
        <InputBox
          error={input.error}
          helperText={input.helperText}
          required={input.required}
          type={input.type || "text"}
          id={input.id}
          label={input.label}
          name={input.name}
          autoFocus={input.autoFocus}
          value={input.value}
          onChange={input.onChange}
          placeholder={input.placeholder}
          inputProps={input.inputProps}
          key={index}
        />
      ))}
      <div className="mt-4">
        <Dropdown
          label={"Role"}
          options={roles}
          value={formData.roleId}
          name={"roleId"}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Inputs;
