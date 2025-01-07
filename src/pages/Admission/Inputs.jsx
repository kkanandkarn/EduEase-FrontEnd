import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputBox from "../../components/InputBox";
import { getDistricts, getStates } from "../../api/api-calls";
import { useNavigate } from "react-router-dom";

const Inputs = ({ formData, errors, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
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
      autoFocus: true,
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
      required: true,
      inputProps: { maxLength: 10 },
    },
    {
      error: !!errors.villageCity,
      helperText: errors.villageCity,
      id: "villageCity",
      label: "Village/City",
      name: "villageCity",
      value: formData.villageCity,
      onChange: handleChange,
      placeholder: "Enter Village/City",
      multiline: false,
      required: true,
      inputProps: { maxLength: 300 },
    },
  ];

  useEffect(() => {
    setStates(getStates(navigate));
  }, []);

  useEffect(() => {
    setDistricts(getDistricts(navigate, formData.districts));
  }, [formData.stateId]);

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
          onChange={input.onChange}
          placeholder={input.placeholder}
          inputProps={input.inputProps}
          key={index}
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default Inputs;
