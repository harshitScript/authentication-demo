const { Router } = require("express");
const { urlencoded } = require("body-parser");
const getHomeController = require("../controllers/getHomeController");
const getLoginFormController = require("../controllers/getLoginFormController");
const getSignUpFormController = require("../controllers/getSignUpFormController");
const postSignUpController = require("../controllers/postSignupController");
const postLoginController = require("../controllers/postLoginController");
const isAuth = require("../middleware/isAuth");
const isUnAuth = require("../middleware/isUnAuth");
const getResetPasswordController = require("../controllers/getResetPasswordController");
const postResetPasswordController = require("../controllers/postResetPasswordController");
const postLogoutController = require("../controllers/postLogoutController");
const getNewPasswordFormController = require("../controllers/getNewPasswordFormController");
const postNewPasswordController = require("../controllers/postNewPasswordController");
const { body } = require("express-validator");
const {
  loginFormValidationSchema,
  signUpValidationSchema,
} = require("../utils/validation-schemas");

const appRoutes = Router();

appRoutes.get("/login", isUnAuth, getLoginFormController);
appRoutes.post(
  "/login",
  urlencoded({ extended: false }),
  loginFormValidationSchema,
  postLoginController
);

appRoutes.get("/sign-up", getSignUpFormController);
appRoutes.post(
  "/sign-up",
  urlencoded({ extended: false }),
  signUpValidationSchema,
  postSignUpController
);

appRoutes.get("/reset-password", getResetPasswordController);
appRoutes.post(
  "/reset-password",
  urlencoded({ extended: false }),
  postResetPasswordController
);

appRoutes.get("/new-password/:userId/:validity", getNewPasswordFormController);
appRoutes.post(
  "/new-password",
  urlencoded({ extended: false }),
  postNewPasswordController
);

appRoutes.post("/logout", postLogoutController);

appRoutes.get("/home", isAuth, getHomeController);

appRoutes.use((req, res) => {
  return res.redirect("/login");
});

module.exports = appRoutes;
