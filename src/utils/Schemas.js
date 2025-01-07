import Joi, { optional } from "joi";

// Define schemas
const Schemas = {
  login: Joi.object({
    email: Joi.string().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    password: Joi.string()
      .min(6) // Set minimum password length
      .max(128) // Set maximum password length
      .required()
      .messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters long.",
        "string.max": "Password must be less than 128 characters long.",
        "any.required": "Password is required.",
      }),
  }),
  tenant_create_tenant_post: Joi.object({
    tenantId: Joi.number()
      .integer()
      .positive()
      .optional()
      .allow(null)
      .messages({
        "number.base": "Tenant ID must be a number.",
        "number.integer": "Tenant ID must be an integer.",
        "number.positive": "Tenant ID must be a positive number.",
      }),
    tenantName: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required.",
    }),
    tenantEmail: Joi.string().trim().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    tenantContact: Joi.string()
      .trim()
      .length(10)
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.empty": "Contact is required.",
        "string.length": "Contact must be exactly 10 digits",
        "string.pattern.base": "Invalid Contact",
        "any.required": "Contact is required",
      }),
    tenantAddress: Joi.string().trim().required().messages({
      "string.empty": "Address is required",
      "any.required": "Address is required.",
    }),
    tenantLogo: Joi.optional().allow("").messages({}),
    tenantPermissions: Joi.array().items(Joi.number()).required().messages({
      "array.base": "Permissions must be an array.",
      "any.required": "Permissions are required.",
    }),
    status: Joi.string()
      .valid("Active", "Inactive")
      .optional()
      .allow("")
      .messages({
        "string.base": "Status must be a string.",
        "string.valid": "Invalid status.",
      }),

    editFlag: Joi.boolean().optional().messages({}),
  }),

  user_create_user_post: Joi.object({
    userId: Joi.number().integer().positive().optional().allow(null).messages({
      "number.base": "User ID must be a number.",
      "number.integer": "User ID must be an integer.",
      "number.positive": "User ID must be a positive number.",
      "any.required": "User Id is required",
    }),
    tenantId: Joi.number().integer().positive().optional().messages({
      "number.base": "Tenant ID must be a number.",
      "number.integer": "Tenant ID must be an integer.",
      "number.positive": "Tenant ID must be a positive number.",
    }),
    name: Joi.string().trim().required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",

      "any.required": "Email is required",
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
      )
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
        "any.required": "Password is required",
      }),
    contact: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.base": "Contact must be a string",
        "string.empty": "Contact is required",
        "string.pattern.base": "Contact must be a valid 10-digit number",
      }),
    address: Joi.string().trim().optional().messages({
      "string.base": "Address must be a string",
      "string.empty": "Address is required",
      "any.required": "Address is required",
    }),
    roleId: Joi.number().integer().positive().required().messages({
      "number.base": "Role ID must be a number",
      "number.integer": "Role ID must be an integer",
      "number.positive": "Role ID must be a positive number",
      "any.required": "Role is required",
    }),
    userImage: Joi.string().optional().allow(null),
    status: Joi.string().trim().allow("").optional().messages({
      "string.base": "Status must be a string.",
    }),
  }),
  user_update_user_post: Joi.object({
    userId: Joi.number().integer().positive().optional().allow(null).messages({
      "number.base": "User ID must be a number.",
      "number.integer": "User ID must be an integer.",
      "number.positive": "User ID must be a positive number.",
      "any.required": "User Id is required",
    }),
    tenantId: Joi.number()
      .integer()
      .positive()
      .optional()
      .allow(null)
      .messages({
        "number.base": "Tenant ID must be a number.",
        "number.integer": "Tenant ID must be an integer.",
        "number.positive": "Tenant ID must be a positive number.",
      }),
    name: Joi.string().trim().required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
      )
      .optional()
      .allow("")
      .messages({
        "string.base": "Password must be a string",
        "string.pattern.base":
          "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    contact: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.base": "Contact must be a string",
        "string.empty": "Contact is required",
        "string.pattern.base": "Contact must be a valid 10-digit number",
      }),
    address: Joi.string().trim().optional().messages({
      "string.base": "Address must be a string",
      "string.empty": "Address is required",
      "any.required": "Address is required",
    }),
    roleId: Joi.number().integer().positive().required().messages({
      "number.base": "Role ID must be a number",
      "number.integer": "Role ID must be an integer",
      "number.positive": "Role ID must be a positive number",
      "any.required": "Role is required",
    }),
    userImage: Joi.optional().allow(null),
    status: Joi.string()
      .trim()
      .valid("Active", "Hold", "Suspended")
      .required()
      .messages({
        "string.base": "Status must be a string.",
        "string.empty": "Status is required",
        "any.only": "Status must be one of Active, Hold, or Suspended.",
        "any.required": "Status is required.",
      }),
  }),

  // Add other schemas here
};

export default Schemas;
