var _ = require("lodash");
var Passport = require("passport");

var config = require("../config/passport");
var db = require("../dbcontext");
var strings = require("../utils/strings");

const { v2_sequelize } = db;
const { QueryTypes } = v2_sequelize;
const APP_ENV = process.env.APP_ENV;
const TABLE_NAME = APP_ENV === "development" ? "tts" : "public";

class PassportProvider {
  constructor(expressApp) {
    this.app = expressApp;
  }

  addLocalStrategy = () => {
    const options = config.local;
    Passport.use(
      new LocalStrategy(options, async (username, password, done) => {
        const sql = `
                SELECT 
                user_id,
                username,
                password,
                email
                FROM ${TABLE_NAME}.users
                WHERE active = true AND username = '${username}'
                `;
        let account = await db.v2_sequelize.query(sql, {
          type: QueryTypes.SELECT,
        });
        account = _.first(account);
        if (_.isNull(account) || _.isUndefined(account))
          return done(null, false, { status: 404 });
        if (strings.verifyHash(password, account.password))
          return done(null, account);
        return done(null, false, { status: 401 });
      })
    );
  };

  addJwtStrategy = () => {
    // Add JwtStrategy
    const options = {
      jwtFromRequest: (req) =>
        ExtractJwt.fromAuthHeaderAsBearerToken()(req) ||
        ExtractJwt.fromUrlQueryParameter("jwt")(req),
      authScheme: "Bearer",
      ...config.jwt,
    };
    Passport.use(
      new JwtStrategy(options, async (jwtPayload, done) => {
        const sql = `
                SELECT 
                user_id,
                username,
                email,
                name
                FROM ${TABLE_NAME}.users
                WHERE active = true AND user_id = '${jwtPayload.iss}'
                `;
        let account = await db.v2_sequelize.query(sql, {
          type: QueryTypes.SELECT,
        });
        account = _.first(account);
        return done(
          null,
          _.isNull(account) || _.isUndefined(account) ? false : account
        );
      })
    );
  };

  boot() {
    this.addLocalStrategy();
    this.addJwtStrategy();
    this.app.use(Passport.initialize());
  }
}

export default PassportProvider;
