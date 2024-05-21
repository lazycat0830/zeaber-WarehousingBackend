var _ = require("lodash");
var moment = require("moment");
const sequelize = require("../../config/db");
const generate = require("../../utils/generate");

const TABLE_NAME = "dbo";

class InventoryRepository {
  //#region getAllProduct
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
  //#endregion
  //#region editInfQuantity
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
  //#endregion
  //#region addPurchase
  addPurchase = async (
    pur_type,
    user_name,
    user_id,
    product,
    pur_allquantity,
    pro_allquantity,
    pro_allCost,
    insertDate
  ) => {
    try {
      const sql = `insert into ${TABLE_NAME}.Purchase (
        pur_type,
        pur_name,
        user_name,
        user_id,
        product,
        pur_allquantity,
        pro_allquantity,
        pro_allCost,
        insertDate
      ) values (
        :pur_type,
        :pur_name,
        :user_name,
        :user_id,
        :product,
        :pur_allquantity,
        :pro_allquantity,
        :pro_allCost,
        :insertDate
      )`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          pur_type,
          pur_name: `${moment
            .utc(insertDate)
            .format("YYYYMMDD")}-${generate.UUID()}`,
          user_name,
          user_id,
          product,
          pur_allquantity,
          pro_allquantity,
          pro_allCost,
          insertDate,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion
  //#region finishPurchase
  finishPurchase = async (pur_id, product) => {
    try {
      const sql = `update ${TABLE_NAME}.Purchase set 
        finish_sts=:finish_sts,
        product=:product,
        finishDate=:finishDate
        where pur_id=:pur_id `;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          finish_sts: 1,
          product: JSON.stringify(product),
          finishDate: moment().format("YYYY-MM-DD HH:mm"),
          pur_id: pur_id,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  getOldProductInf = async (product) => {
    try {
      const item = _.map(
        product,
        (p) =>
          `(pro_id='${p.pro_id}' and pro_color='${p.pro_color}' and pro_size='${p.pro_size}')`
      ).join(" or ");
      const sql = `select pro_id,inf_id,pro_quantity,pro_color,pro_size from ProductInf where isDelete=0 and (${item}) `;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  putInfQuantity = async (proInf, oldProInf, pur_type) => {
    try {
      const sql = `update ${TABLE_NAME}.ProductInf set 
      pro_quantity=:pro_quantity
      where pro_id=:pro_id and pro_color=:pro_color and pro_size=:pro_size`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          pro_quantity: pur_type
            ? oldProInf.pro_quantity + proInf.pro_quantity
            : oldProInf.pro_quantity - proInf.pro_quantity,
          pro_id: proInf.pro_id,
          pro_color: proInf.pro_color,
          pro_size: proInf.pro_size,
        },
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion
  //#region deletePurchase
  deletePurchase = async (pur_id) => {
    try {
      const sql = `update ${TABLE_NAME}.Purchase set 
      isDelete=1
      where pur_id='${pur_id}'`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion
  //#region getAllPurchase
  getAllPurchase = async () => {
    try {
      const sql = `select pur_id,pur_name,insertDate,pur_type,finish_sts,pur_allquantity,pro_allquantity,pro_allCost,finishDate from Purchase where isDelete=0`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion
}

module.exports = new InventoryRepository();
