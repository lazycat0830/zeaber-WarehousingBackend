var _ = require("lodash");
const sequelize = require("../../config/db");

const TABLE_NAME = "dbo";

class SettingRepository {
  getInformation = async () => {
    try {
      const sql = `select * from SettingPay`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  getSettingPay = async () => {
    try {
      const sql = `select * from SettingPay`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };

  addSettingPay = async (setpay_name) => {
    try {
      const sql = `insert into ${TABLE_NAME}.SettingPay (setpay_name) values ('${setpay_name}')`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new SettingRepository();
