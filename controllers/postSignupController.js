const Users = require("../models/Users");
const { failureCallback, generateHashedPassword } = require("../utils/helper");
const { validationResult } = require("express-validator");

const postSignUpController = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    req.flash("validation_error", validationErrors.errors);
    req.flash("old_input", { name, email, password, confirmPassword });
    return res.redirect("/sign-up");
  }

  const hashedPassword = generateHashedPassword({ password });

  const successCallback = () => {
    req.flash("success", "User creation successful.");
    return res.redirect("/login");
  };

  const user = new Users({ name, email, password: hashedPassword });

  user.save().then(successCallback).catch(failureCallback);
};
module.exports = postSignUpController;
