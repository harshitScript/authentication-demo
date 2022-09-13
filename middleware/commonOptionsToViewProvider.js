const commonOptionsToViewProvider = (req, res, next) => {
  res.locals.logged_in_user = req?.user?.name || "User";
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req?.isAuthenticated;
  next();
};

module.exports = commonOptionsToViewProvider;
