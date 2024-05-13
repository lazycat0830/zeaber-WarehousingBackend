var _ = require("lodash");
const sequelize = require("../../config/db");

const TABLE_NAME = "dbo";

class IsDeleteRepository {
  delIsDelete = async (table) => {
    try {
      const sql = `delete from ${TABLE_NAME}.${table} where isDelete=1`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.DELETE,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new IsDeleteRepository();
