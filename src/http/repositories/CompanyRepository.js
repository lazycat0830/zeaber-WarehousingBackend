var _ = require("lodash");
const sequelize = require("../../config/db");

const TABLE_NAME = "dbo";

class CompanyRepository {
  getAllCompany = async () => {
    try {
      const sql = `select * from Company`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new CompanyRepository();
