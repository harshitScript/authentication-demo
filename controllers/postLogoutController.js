const postLogoutController = (req, res, next) => {
  req.session.userId = undefined;
  req.session.save((err) => {
    if (err) {
      req.flash("error", "Unknown error occurred, Please retry.");
      return res.redirect("/home");
    }

    req.flash("success", "Successfully Logged Out");
    return res.redirect("/login");
  });
};
module.exports = postLogoutController;
