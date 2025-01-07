import React from "react";
import InputBox from "../../../components/InputBox";

const Inputs = ({ formData, errors, handleChange }) => {
  const inputs = [
    {
      error: !!errors.tenantName,
      helperText: errors.tenantName,
      required: true,
      id: "tenantName",
      label: "Tenant Name",
      name: "tenantName",
      autoFocus: true,
      value: formData.tenantName,
      onChange: handleChange,
      placeholder: "Enter Tenant Name",
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
      inputProps: { maxLength: 300 },
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
    </div>
  );
};

export default Inputs;
