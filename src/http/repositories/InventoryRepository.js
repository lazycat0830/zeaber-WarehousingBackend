var _ = require("lodash");
const sequelize = require("../../config/db");

const TABLE_NAME = "dbo";

class InventoryRepository {
  // getInventory
  getAllProduct = async () => {
    try {
      const sql = `select com_id,pro_id,pro_comName,pro_homemadeName,type_id,pro_insertDate,pro_img from Product where isDelete=0`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  getInventory = async (pro_id) => {
    try {
      const sql = `select * from (select  p.com_id,p.pro_id, p.pro_comName,
       p.pro_homemadeName ,p.pro_cost ,p.pro_price ,pi.inf_id,
       pi.pro_barcode,pi.pro_color,pi.pro_size,pi.pro_quantity 
       from ${TABLE_NAME}.Product as p inner join ${TABLE_NAME}.ProductInf as pi on p.pro_id=pi.pro_id
       where  p.isDelete=0 and  pi.isDelete =0 )m where m.pro_id='${pro_id}'`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  // editInfQuantity
  editInfQuantity = async (com_id, pro_id, inf_id, pro_quantity) => {
    try {
      const sql = `update ${TABLE_NAME}.ProductInf set 
        pro_quantity=:pro_quantity
        where com_id=:com_id and pro_id=:pro_id and inf_id=:inf_id`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          com_id: com_id,
          pro_id: pro_id,
          inf_id: inf_id,
          pro_quantity: pro_quantity,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new InventoryRepository();
