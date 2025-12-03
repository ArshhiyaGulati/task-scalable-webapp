const { body, validationResult } = require("express-validator");

// RUN VALIDATIONS
const validate = (validations) => {
  return async (req, res, next) => {
    if (!validations) {
      return next(); // prevent crash
    }

    await Promise.all(validations.map(v => v.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    next();
  };
};

// AUTH VALIDATION
const registerValidation = [
  body("full_name").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be ≥ 6 chars")
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required")
];

// TASK VALIDATION
const taskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().isString(),
  body("status").optional().isIn(["pending", "in_progress", "completed"]),
  body("priority").optional().isIn(["low", "medium", "high"]),
  body("due_date").optional().isISO8601().toDate()
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  taskValidation
};

