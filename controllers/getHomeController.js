const getHomeController = (req, res, next) => {
  return res.render("home", {
    docTitle: "Home",
    successMessage: req.flash("success")[0],
  });
};

module.exports = getHomeController;
