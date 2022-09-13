const { body } = require("express-validator");
const User = require("../models/Users");

const loginFormValidationSchema = [
  body("email").trim().isEmail().withMessage("Please enter a valid email."),
  body("password")
    .trim()
    .isLength({ min: 5, max: 25 })
    .withMessage("Password must be 5-25 characters long."),
];

const signUpValidationSchema = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be within 3-30 characters."),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) return Promise.reject("User with this email already exist.");
      });
    }),
  body("password")
    .trim()
    .isLength({ min: 5, max: 25 })
    .withMessage("Password must be 5-25 characters long."),
  body("confirmPassword")
    .trim()
    .custom(
      (
        value,
        {
          req: {
            body: { password },
          },
        }
      ) => {
        if (value === password) return true;
        throw new Error("Passwords not matched.");
      }
    ),
];

module.exports = {
  loginFormValidationSchema,
  signUpValidationSchema,
};
