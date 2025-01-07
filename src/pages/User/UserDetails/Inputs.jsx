import React, { useState } from "react";
import InputBox from "../../../components/InputBox";
import Dropdown from "../../../components/Dropdown";
import { statusOptions } from "../../../utils/constant";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Inputs = ({ formData, errors, handleChange, roles, mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const inputs = [
    {
      error: !!errors.name,
      helperText: errors.name,
      required: true,
      id: "name",
      label: "Name",
      name: "name",
      autoFocus: mode !== "view",
      value: formData.name,
      onChange: handleChange,
      placeholder: "Enter Name",
      multiline: false,
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
      multiline: false,
      inputProps: { maxLength: 100 },
    },
    {
      error: !!errors.password,
      helperText: errors.password,
      required: true,
      id: "password",
      label: "Password",
      name: "password",
      type: "text",
      value: formData.password,
      onChange: handleChange,
      placeholder: "Enter Password",
      multiline: false,
      inputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
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
      id: "contact",
      label: "Contact",
      name: "contact",
      value: formData.contact,
      onChange: handleChange,
      placeholder: "Enter Contact",
      multiline: false,
      inputProps: { maxLength: 10 },
    },
    {
      error: !!errors.address,
      helperText: errors.address,
      id: "address",
      label: "Address",
      name: "address",
      value: formData.address,
      onChange: handleChange,
      placeholder: "Enter Address",
      multiline: false,
      inputProps: { maxLength: 300 },
    },
  ];

  return (
    <div className="grid grid-cols-2 w-full gap-4">
      {inputs.map((input, index) => (
        <InputBox
          error={input.error}
          helperText={input.helperText}
          required={input.required}
          type={input.id === "password" && !showPassword ? "password" : "text"}
          id={input.id}
          label={input.label}
          name={input.name}
          autoFocus={input.autoFocus}
          value={input.value}
          onChange={mode === "view" ? null : input.onChange}
          placeholder={input.placeholder}
          inputProps={input.inputProps}
          key={index}
        />
      ))}
      <div className="mt-4">
        <Dropdown
          handleChange={mode === "view" ? null : handleChange}
          label={"Role"}
          name={"roleId"}
          options={roles}
          value={formData.roleId}
          error={errors.roleId}
        />
        {errors.roleId && (
          <p className="text-sm text-red-500">Role is required</p>
        )}
      </div>

      {mode !== "add" && (
        <div className="mb-4">
          <Dropdown
            handleChange={mode === "view" ? null : handleChange}
            label={"Status"}
            name={"status"}
            options={statusOptions}
            value={formData.status}
          />
        </div>
      )}
    </div>
  );
};

export default Inputs;
