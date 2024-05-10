var _ = require("lodash");
var Passport = require("passport");

const jwtAuth = (type) => {
  switch (_.toLower(type)) {
    case "local":
      return Passport.authenticate("local", { session: false });
    case "jwt":
      return Passport.authenticate("jwt", { session: false });
    default:
      console.error(`Middlewares.auth : Unknow auth type ${type}`); // eslint-disable-line no-console
      return (req, res, next) => {
        next();
      };
  }
};

module.exports = { jwtAuth };
