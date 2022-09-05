const getResetPasswordController = (req, res) => {
  return res.render("reset-password-form", {
    docTitle: "Reset Your Password",
    errorMessage: req.flash("error")[0],
    successMessage: req.flash("success")[0],
  });
};

module.exports = getResetPasswordController;
