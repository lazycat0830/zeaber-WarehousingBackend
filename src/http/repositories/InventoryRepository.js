var _ = require("lodash");
const sequelize = require("../../config/db");

const TABLE_NAME = "dbo";

class InventoryRepository {
  getInventory = async () => {
    try {
      const sql = `select * from Product`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new InventoryRepository();
