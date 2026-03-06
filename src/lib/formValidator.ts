export interface ValidationResult {
  errors: Record<string, string>;
  firstError?: string;
}

export function validateForm(
  schema: any[],
  formData: FormData,
): ValidationResult {
  const errors: Record<string, string> = {};

  schema.forEach((section) => {
    section.fields.forEach((field: any) => {
      const raw = formData.get(field.name);
      const value = raw?.toString().trim();

      /* REQUIRED */

      if (field.required) {
        if (!value) {
          errors[field.name] = `${field.label} is required`;
          return;
        }
      }

      /* EMAIL */

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          errors[field.name] = "Invalid email address";
        }
      }

      /* PHONE */

      if (field.type === "phone" && value) {
        const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

        if (!phoneRegex.test(value)) {
          errors[field.name] = "Invalid phone number";
        }
      }

      /* TEXT LENGTH */

      if (field.minLength && value) {
        if (value.length < field.minLength) {
          errors[field.name] =
            `${field.label} must be at least ${field.minLength} characters`;
        }
      }

      if (field.maxLength && value) {
        if (value.length > field.maxLength) {
          errors[field.name] =
            `${field.label} must be less than ${field.maxLength} characters`;
        }
      }

      /* NUMBER */

      if (field.type === "number" && value) {
        const num = Number(value);

        if (isNaN(num)) {
          errors[field.name] = `${field.label} must be a number`;
        }

        if (field.min !== undefined && num < field.min) {
          errors[field.name] =
            `${field.label} must be greater than ${field.min}`;
        }

        if (field.max !== undefined && num > field.max) {
          errors[field.name] = `${field.label} must be less than ${field.max}`;
        }
      }

      /* TAGS */

      if (field.type === "tags") {
        const rawTags = formData.get(field.name)?.toString() || "[]";
        const tags = JSON.parse(rawTags);

        if (field.required && tags.length === 0) {
          errors[field.name] = `${field.label} is required`;
        }
      }

      /* FILE */

      if (field.type === "file") {
        const files = formData.getAll(field.name);

        if (field.required && files.length === 0) {
          errors[field.name] = `${field.label} is required`;
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
