import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),

  lastName: Joi.string().required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "Phone must be a string of numbers",
      "string.pattern.base": "Phone must be a 10-digit number",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

  dob: Joi.date().optional().messages({
    "date.base": "Date of birth must be a valid date",
  }),

  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").optional().messages({
    "any.only": "Gender must be one of MALE, FEMALE, or OTHER",
  }),

  role: Joi.string()
    .valid(
      "PRINCIPAL",
      "VICE_PRINCIPAL",
      "TEACHER",
      "LIBRARIAN",
      "LAB_ASSISTANT",
      "COUNSELOR",
      "ADMIN",
      "ACCOUNTANT",
      "CLERK",
      "RECEPTIONIST",
      "PEON",
      "SECURITY",
      "TRANSPORT",
      "HOSTEL_WARDEN",
      "IT_STAFF",
      "OTHER"
    )
    .required()
    .messages({
      "any.only": "Role must be a valid role from the predefined list",
      "any.required": "Role is required",
    }),

  department: Joi.string()
    .valid(
      "SCIENCE",
      "MATH",
      "ENGLISH",
      "HISTORY",
      "GEOGRAPHY",
      "COMPUTER_SCIENCE",
      "PHYSICAL_EDUCATION",
      "ARTS",
      "MUSIC",
      "LIBRARY",
      "ADMINISTRATION",
      "ACCOUNTING",
      "TRANSPORT",
      "IT_SUPPORT",
      "OTHER"
    )
    .optional()
    .messages({
      "any.only":
        "Department must be a valid department from the predefined list",
    }),

  joiningDate: Joi.date().optional().messages({
    "date.base": "Joining date must be a valid date",
  }),

  employeeId: Joi.string().optional().messages({
    "string.base": "Employee ID must be a string",
  }),

  address: Joi.object({
    street: Joi.string().optional().messages({
      "string.base": "Street must be a string",
    }),
    city: Joi.string().optional().messages({
      "string.base": "City must be a string",
    }),
    state: Joi.string().optional().messages({
      "string.base": "State must be a string",
    }),
    country: Joi.string().optional().messages({
      "string.base": "Country must be a string",
    }),
    zipCode: Joi.string().optional().messages({
      "string.base": "Zip code must be a string",
    }),
  }).optional(),

  bank: Joi.object({
    accountHolderName: Joi.string().optional().messages({
      "string.base": "Account holder name must be a string",
    }),
    accountNumber: Joi.string().optional().messages({
      "string.base": "Account number must be a string",
    }),
    ifscCode: Joi.string().optional().messages({
      "string.base": "IFSC code must be a string",
    }),
    bankName: Joi.string().optional().messages({
      "string.base": "Bank name must be a string",
    }),
  }).optional(),
});

export const updateEmployeeSchema = Joi.object({
  firstName: Joi.string().optional().messages({
    "string.base": "First name must be a string",
  }),

  lastName: Joi.string().optional().messages({
    "string.base": "Last name must be a string",
  }),

  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      "string.base": "Phone must be a string of numbers",
      "string.pattern.base": "Phone must be a 10-digit number",
    }),

  dob: Joi.date().optional().messages({
    "date.base": "Date of birth must be a valid date",
  }),

  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").optional().messages({
    "any.only": "Gender must be one of MALE, FEMALE, or OTHER",
  }),

  role: Joi.string()
    .valid(
      "PRINCIPAL",
      "VICE_PRINCIPAL",
      "TEACHER",
      "LIBRARIAN",
      "LAB_ASSISTANT",
      "COUNSELOR",
      "ADMIN",
      "ACCOUNTANT",
      "CLERK",
      "RECEPTIONIST",
      "PEON",
      "SECURITY",
      "TRANSPORT",
      "HOSTEL_WARDEN",
      "IT_STAFF",
      "OTHER"
    )
    .optional()
    .messages({
      "any.only": "Role must be a valid role from the predefined list",
    }),

  department: Joi.string()
    .valid(
      "SCIENCE",
      "MATH",
      "ENGLISH",
      "HISTORY",
      "GEOGRAPHY",
      "COMPUTER_SCIENCE",
      "PHYSICAL_EDUCATION",
      "ARTS",
      "MUSIC",
      "LIBRARY",
      "ADMINISTRATION",
      "ACCOUNTING",
      "TRANSPORT",
      "IT_SUPPORT",
      "OTHER"
    )
    .optional()
    .messages({
      "any.only":
        "Department must be a valid department from the predefined list",
    }),

  joiningDate: Joi.date().optional().messages({
    "date.base": "Joining date must be a valid date",
  }),

  employeeId: Joi.string().optional().messages({
    "string.base": "Employee ID must be a string",
  }),

  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zipCode: Joi.string().optional(),
  }).optional(),

  bank: Joi.object({
    accountHolderName: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
    ifscCode: Joi.string().optional(),
    bankName: Joi.string().optional(),
  }).optional(),

  status: Joi.string().valid("ACTIVE", "INACTIVE").optional().messages({
    "any.only": "Status must be either ACTIVE or INACTIVE",
  }),
});
