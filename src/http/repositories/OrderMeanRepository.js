var _ = require("lodash");
var moment = require("moment");
const sequelize = require("../../config/db");

const TABLE_NAME = "dbo";

class OrderMeanRepository {
  getAllOrder = async () => {
    try {
      const sql = `select ord_id,ord_type,ord_sts,pay_sts,ord_pay,ord_date from ${TABLE_NAME}.OrderMean where isDelete=0`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#region addOrder
  addOrder = async (
    ord_pay,
    pay_type,
    pay_sts,
    ord_sts,
    ord_remark,
    ord_receipt,
    ord_GUInum,
    user_name,
    user_id,
    product,
    ord_detailsPDF
  ) => {
    try {
      const sql = `insert into OrderMean (
        ord_type,
        pay_sts,
        ord_sts,
        ord_pay,
        pay_type,
        ord_remark,
        ord_receipt,
        ord_GUInum,
        user_name,
        user_id,
        ord_date,
        product,
        ord_detailsPDF
      ) values (
        :ord_type,
        :pay_sts,
        :ord_sts,
        :ord_pay,
        :pay_type,
        :ord_remark,
        :ord_receipt,
        :ord_GUInum,
        :user_name,
        :user_id,
        :ord_date,
        :product,
        :ord_detailsPDF)`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          ord_type: "order",
          pay_sts,
          ord_sts,
          ord_pay,
          pay_type,
          ord_remark,
          ord_receipt,
          ord_GUInum,
          user_name,
          user_id,
          ord_date: moment().format("YYYY-MM-DD HH:mm"),
          product: JSON.stringify(product),
          ord_detailsPDF: ord_detailsPDF ? ord_detailsPDF : null,
        },
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion
  //#region editStsOrder
  editStsOrder = async (
    ord_id,
    ord_pay,
    pay_type,
    pay_sts,
    ord_sts,
    ord_remark,
    ord_receipt,
    ord_GUInum,
    user_name,
    user_id,
    product,
    ord_detailsPDF
  ) => {
    try {
      const sql = `update ${TABLE_NAME}.OrderMean set
      ord_pay=:ord_pay,
      pay_type=:pay_type,
      pay_sts=:pay_sts,
      ord_sts=:ord_sts,
      ord_remark=:ord_remark,
      ord_receipt=:ord_receipt,
      ord_GUInum=:ord_GUInum,
      user_name=:user_name,
      user_id=:user_id,
      product=:product,
      ord_detailsPDF=:ord_detailsPDF 
      where ord_id =:ord_id`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          ord_id,
          ord_type: "order",
          pay_sts,
          ord_sts,
          ord_pay,
          pay_type,
          ord_remark,
          ord_receipt,
          ord_GUInum,
          user_name,
          user_id,
          product: JSON.stringify(product),
          ord_detailsPDF: ord_detailsPDF ? ord_detailsPDF : null,
        },
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion
  //#region cancelOrder
  cancelOrder = async (ord_id) => {
    try {
      const sql = `update ${TABLE_NAME}.OrderMean set isDelete=1,ord_type='cancel' where isDelete=0 and ord_id='${ord_id}'`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  getOrder = async (ord_id) => {
    try {
      const sql = `select * from ${TABLE_NAME}.OrderMean where  isDelete=0 and  ord_id='${ord_id}'`;
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

module.exports = new OrderMeanRepository();
