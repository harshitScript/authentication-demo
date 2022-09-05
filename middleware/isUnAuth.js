const isUnAuth = (req, res, next) => {
  if (req.isAuthenticated) {
    req.flash("success", `Welcome back ${req.user.name}`);
    return res.redirect("/home");
  }
  return next();
};

module.exports = isUnAuth;
