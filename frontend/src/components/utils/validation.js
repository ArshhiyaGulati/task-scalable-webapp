// ---- TASK VALIDATION ----
export const validateTask = (values) => {
  const errors = {};

  if (!values.title || values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (!values.description || values.description.trim().length < 5) {
    errors.description = "Description must be at least 5 characters long";
  }

  if (!values.status) {
    errors.status = "Status is required";
  }

  return errors;
};

// ---- AUTH VALIDATION ----
export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) errors.email = "Email is required";
  if (!values.password) errors.password = "Password is required";

  return errors;
};

export const validateRegister = (values) => {
  const errors = {};

  if (!values.full_name || values.full_name.length < 2)
    errors.full_name = "Full name must be at least 2 characters";

  if (!values.email) errors.email = "Email is required";

  if (!values.password || values.password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return errors;
};

