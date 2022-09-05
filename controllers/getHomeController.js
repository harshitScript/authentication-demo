const getHomeController = (req, res, next) => {
  return res.render("home", {
    docTitle: "Home",
    errorMessage: req.flash("error")[0],
    successMessage: req.flash("success")[0],
  });
};

module.exports = getHomeController;
