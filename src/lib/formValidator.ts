export interface ValidationResult {
  errors: Record<string, string>;
  firstError?: string;
}

export function validateForm(
  schema: any[],
  values: Record<string, any>,
): ValidationResult {
  const errors: Record<string, string> = {};

  schema.forEach((section) => {
    section.fields.forEach((field: any) => {
      const value = values[field.name];

      /* REQUIRED */

      if (field.required) {
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          errors[field.name] =
            field.errorMessage || `${field.label} is required`;
          return;
        }
      }

      /* EMAIL */

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          errors[field.name] = field.errorMessage || "Invalid email address";
        }
      }

      /* PHONE */

      if (field.type === "phone" && value) {
        const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

        if (!phoneRegex.test(value)) {
          errors[field.name] = field.errorMessage || "Invalid phone number";
        }
      }

      /* TEXT LENGTH */

      if (field.minLength && value) {
        if (value.length < field.minLength) {
          errors[field.name] =
            field.errorMessage ||
            `${field.label} must be at least ${field.minLength} characters`;
        }
      }

      if (field.maxLength && value) {
        if (value.length > field.maxLength) {
          errors[field.name] =
            field.errorMessage ||
            `${field.label} must be less than ${field.maxLength} characters`;
        }
      }

      /* NUMBER + DECIMAL */

      if (
        (field.type === "number" || field.type === "decimal") &&
        value !== undefined &&
        value !== ""
      ) {
        const num = Number(value);

        if (isNaN(num)) {
          errors[field.name] =
            field.errorMessage || `${field.label} must be a number`;
        }

        if (field.min !== undefined && num < field.min) {
          errors[field.name] =
            field.errorMessage ||
            `${field.label} must be greater than ${field.min}`;
        }

        if (field.max !== undefined && num > field.max) {
          errors[field.name] =
            field.errorMessage ||
            `${field.label} must be less than ${field.max}`;
        }
      }

      /* PATTERN */

      if (field.pattern && value) {
        const regex = new RegExp(field.pattern);

        if (!regex.test(value)) {
          errors[field.name] =
            field.errorMessage || `${field.label} format is invalid`;
        }
      }

      /* TAGS */

      if (field.type === "tags") {
        const tags = Array.isArray(value) ? value : [];

        if (field.required && tags.length === 0) {
          errors[field.name] =
            field.errorMessage || `${field.label} is required`;
        }
      }

      /* FILE */

      if (field.type === "file") {
        const files = Array.isArray(value) ? value : [];

        if (field.required && files.length === 0) {
          errors[field.name] =
            field.errorMessage || `${field.label} is required`;
        }
      }
    });
  });

  const firstError = Object.keys(errors)[0];

  return {
    errors,
    firstError,
  };
}
