const User = require("../models/Users");
const { failureCallback } = require("../utils/helper");

const getNewPasswordFormController = (req, res) => {
  const { userId, validity } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Token");
        return res.redirect("/reset-password");
      }

      if (Date.now() > +validity) {
        req.flash("error", "Token Expired");
        return res.redirect("/reset-password");
      }

      return res.render("new-password-form", {
        docTitle: "Update Your new Password",
        errorMessage: req.flash("error")[0],
        successMessage: req.flash("success")[0],
      });
    })
    .catch(failureCallback);
};

module.exports = getNewPasswordFormController;
