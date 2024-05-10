var _ = require("lodash");
var moment = require("moment");
var strings = require("../../utils/strings");
const sequelize = require("../../config/db");
const TABLE_NAME = "dbo";

class AuthRepository {
  Login = async (accountt) => {
    try {
      const sql = `
        SELECT
        *
        FROM ${TABLE_NAME}.Members
        WHERE account = '${accountt}'
        `;
      const account = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return account;
    } catch (err) {
      return err.message;
    }
  };
  Register = async (account, password, name, email, role) => {
    try {
      const sql = `
        INSERT INTO ${TABLE_NAME}.Members
        (
          account,
          password,
          name,
          email,
          role,
          insertDate
        )
        VALUES
        (
         :account,
         :password,
         :name,
         :email,
         :role,
         :insertDate
        )
      `;

      const result = await sequelize.query(sql, {
        replacements: {
          account: account,
          password: strings.hash(password),
          name: name,
          email: email,
          role: role,
          insertDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      });

      return result;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new AuthRepository();
