const { createHmac } = require("crypto");

const generateHashedPassword = ({ algorithm = "sha512", password = "" }) => {
  return createHmac(algorithm, process.env.SECRET)
    .update(password)
    .digest("hex");
};

module.exports = {
  generateHashedPassword,
};
