var _ = require("lodash");
const sequelize = require("../../config/db");
const TABLE_NAME = "dbo";

class ProductTypeRepository {
  addProductType = async (type_title) => {
    try {
      const sql = `insert into ${TABLE_NAME}.ProductType
            (
                type_title
            ) values 
            (
                :type_title
            )`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          type_title: type_title,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  getAllProductType = async () => {
    try {
      const sql = `select * from ${TABLE_NAME}.ProductType`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  editProductType = async (type_id, type_title) => {
    try {
      const sql = `update ${TABLE_NAME}.ProductType set type_title=:type_title where type_id=:type_id`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          type_id: type_id,
          type_title: type_title,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  delProductType = async (ListTypeId) => {
    try {
      const sqlPros = _.chain(ListTypeId)
        .map((type_id) => {
          return `type_id = '${type_id}'`;
        })
        .compact()
        .join(" OR ")
        .value();
      const sql = `delete from ${TABLE_NAME}.ProductType where ${sqlPros}`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.DELETE,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new ProductTypeRepository();
