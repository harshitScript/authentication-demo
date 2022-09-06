const User = require("../models/Users");
const { failureCallback } = require("../utils/helper");
const { createTransport } = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transport = createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

const postResetPasswordController = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Email is not associated with a user.");
        return res.redirect("/reset-password");
      }

      transport.sendMail({
        to: email,
        from: process.env.SERVER_MAIL,
        subject: "Password Reset Link.",
        html: `
        <p>This link is valid for only 1 hour.</p>
        <a href="http://localhost:4000/new-password/${user?._id}/${
          Date.now() + 3600000
        }">Click Here</a>
        `,
      });

      return res.redirect("/login");
    })
    .catch(failureCallback);
};
module.exports = postResetPasswordController;
