import React from "react";
import InputBox from "../../../components/InputBox";
import Dropdown from "../../../components/Dropdown";
import { statusOptions } from "../../../utils/constant";

const Inputs = ({ formData, errors, handleChange, mode }) => {
  const inputs = [
    {
      error: !!errors.tenantName,
      helperText: errors.tenantName,
      required: true,
      id: "tenantName",
      label: "Tenant Name",
      name: "tenantName",
      autoFocus: mode !== "view",
      value: formData.tenantName,
      onChange: handleChange,
      placeholder: "Enter Tenant Name",
      multiline: false,
      inputProps: { maxLength: 100 },
    },
    {
      error: !!errors.tenantEmail,
      helperText: errors.tenantEmail,
      required: true,
      id: "email",
      label: "Tenant Email",
      name: "tenantEmail",
      value: formData.tenantEmail,
      onChange: handleChange,
      placeholder: "Enter Email",
      multiline: false,
      inputProps: { maxLength: 100 },
    },
    {
      error: !!errors.tenantContact,
      helperText: errors.tenantContact,
      id: "tenantContact",
      label: "Tenant Contact",
      name: "tenantContact",
      value: formData.tenantContact,
      onChange: handleChange,
      placeholder: "Enter Contact",
      multiline: false,
      inputProps: { maxLength: 10 },
    },
    {
      error: !!errors.tenantAddress,
      helperText: errors.tenantAddress,
      id: "tenantAddress",
      label: "Tenant Address",
      name: "tenantAddress",
      value: formData.tenantAddress,
      onChange: handleChange,
      placeholder: "Enter Address",
      multiline: false,
      inputProps: { maxLength: 300 },
    },
  ];

  return (
    <div className="grid grid-cols-2  w-full gap-4">
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
          onChange={mode === "view" ? null : input.onChange}
          placeholder={input.placeholder}
          inputProps={input.inputProps}
          key={index}
        />
      ))}
      {mode !== "add" && (
        <Dropdown
          handleChange={mode === "view" ? null : handleChange}
          label={"Status"}
          name={"status"}
          options={statusOptions}
          value={formData.status}
        />
      )}
    </div>
  );
};

export default Inputs;
