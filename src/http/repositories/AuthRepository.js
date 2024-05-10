var _ = require("lodash");
var moment = require("moment");
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
}

module.exports = new AuthRepository();
