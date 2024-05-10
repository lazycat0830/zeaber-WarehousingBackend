require("dotenv").config();

module.exports = {
  local: {
    usernameField: "account",
    passwordField: "password",
  },
  jwt: {
    secretOrKey: process.env.JWT_SECRET || "secret",
  },
};
