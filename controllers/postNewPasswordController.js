const User = require("../models/Users");
const { failureCallback, generateHashedPassword } = require("../utils/helper");

const postNewPasswordController = (req, res) => {
  const { newPassword, newConfirmPassword, userId } = req.body;

  if (newPassword !== newConfirmPassword) {
    req.flash("error", "Password and Confirm Password not matched.");
    return res.redirect("/reset-password");
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        req.flash("error", "Unauthorized activity detected.");
        return res.redirect("/reset-password");
      }

      user.password = generateHashedPassword({ password: newPassword });

      return user.save();
    })
    .then(() => {
      req.flash("success", "Password Reset Successful.");
      return res.redirect("/login");
    })
    .catch(failureCallback);
};
module.exports = postNewPasswordController;
