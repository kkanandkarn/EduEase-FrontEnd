import Schemas from "./Schemas";

const validateSchema = (schemaName, formData, errors, setErrors) => {
  const errorsCopy = { ...errors };

  // Fetch the schema by name
  const schema = Schemas[schemaName];

  if (!schema) {
    console.error(`Schema "${schemaName}" not found.`);
    return false;
  }

  // Validate the form data
  const { error } = schema.validate(formData, { abortEarly: false });

  if (error) {
    error.details.forEach((detail) => {
      const field = detail.path[0];
      errorsCopy[field] = detail.message;
    });
    console.log(errorsCopy);
    setErrors(errorsCopy);
    return false;
  }
  setErrors({});
  return true;
};
export default validateSchema;
