const expressGlobalErrorHandlingMiddleware = (error, req, res, next) => {
  //? Any thrown error as well as next(error) handled here globally.

  return res.status(500).render("server-error.ejs", {
    docTitle: "Server side Error Occurred",
    errorMessage: req.flash("error")[0],
    successMessage: req.flash("success")[0],
  });
};
module.exports = expressGlobalErrorHandlingMiddleware;
