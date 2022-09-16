const Users = require("../models/Users");
const { generateHashedPassword } = require("../utils/helper");
const { validationResult } = require("express-validator");

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors?.isEmpty()) {
    req.flash("validation_error", validationErrors?.errors);
    req.flash("old_input", { email, password });
    return res.redirect("/login");
  }

  const hashedPassword = generateHashedPassword({ password });

  const failureCallback = (error) => {
    return next(error);
  };

  Users.findOne({ email, password: hashedPassword })
    .then((user) => {
      if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/login");
      }

      req.session.userId = user?._id;
      req.session.save((err) => {
        if (err) {
          req.flash("error", "Error occurred while creating session.");
          return res.redirect("/login");
        }
        return res.redirect("/home");
      });
    })
    .catch(failureCallback);
};
module.exports = postLoginController;
