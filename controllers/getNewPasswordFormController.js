const User = require("../models/Users");

const getNewPasswordFormController = (req, res) => {
  const { userId, validity } = req.params;

  const failureCallback = (error) => {
    return next(error);
  };

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
        userId: user?._id,
      });
    })
    .catch(failureCallback);
};

module.exports = getNewPasswordFormController;
