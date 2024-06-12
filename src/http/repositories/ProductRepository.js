var _ = require("lodash");
const sequelize = require("../../config/db");
var moment = require("moment");
var generate = require("../../utils/generate");

const TABLE_NAME = "dbo";

class IsDeleteRepository {
  //#region addProduct
  addProduct = async (
    com_id,
    pro_comName,
    pro_homemadeName,
    type_id,
    pro_cost,
    pro_price,
    pro_img,
    pro_style
  ) => {
    try {
      const sql = `insert into ${TABLE_NAME}.Product (
        com_id,
        pro_comName,
        pro_homemadeName,
        type_id,
        pro_cost,
        pro_price,
        pro_img,
        pro_insertDate,
        pro_style
      ) values (
       :com_id,
       :pro_comName,
       :pro_homemadeName,
       :type_id,
       :pro_cost,
       :pro_price,
       :pro_img,
       :pro_insertDate,
       :pro_style
      )`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          com_id,
          pro_comName,
          pro_homemadeName,
          type_id,
          pro_cost,
          pro_price,
          pro_img: pro_img ? pro_img : null,
          pro_insertDate: moment().format("YYYY-MM-DD HH:mm"),
          pro_style: JSON.stringify(pro_style),
        },
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  getaddTopProductId = async () => {
    try {
      const sql = `select top 1 pro_id from ${TABLE_NAME}.Product order by pro_insertDate desc`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  addProductInf = async (com_id, pro_comName, pro_id, pro_style) => {
    try {
      let sql = "";
      if (_.isEmpty(pro_style)) {
        sql = `insert into ${TABLE_NAME}.ProductInf (com_id,pro_id,pro_barcode,pro_comName) values (${com_id},'${pro_id}','${generate.UUID()}','${pro_comName}')`;
      } else {
        const sqlComs = _.chain(pro_style.color)
          .map((pro_color) => {
            return _.map(pro_style.size, (pro_size) => {
              return `(
            '${com_id}',
            '${pro_id}',
            '${pro_color}',
            '${pro_size}',
            '${generate.UUID()}',
            '${pro_comName}'
          )`;
            });
          })
          .flatten()
          .compact()
          .join(",")
          .value();
        sql = `insert into ${TABLE_NAME}.ProductInf (com_id,pro_id,pro_color,pro_size,pro_barcode,pro_comName) values ${sqlComs}`;
      }
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion

  //#region getAllProduct
  getAllProduct = async () => {
    try {
      const sql = `select * from Product where isDelete=0`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion

  //#region deleteProduct
  deleteProduct = async (ListPro) => {
    try {
      const sqlPros = _.chain(ListPro)
        .map((pro_id) => {
          return `pro_id = '${pro_id}'`;
        })
        .compact()
        .join(" OR ")
        .value();

      const sql = `update ${TABLE_NAME}.Product set isDelete=1 where ${sqlPros}`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  deleteProductInf = async (ListPro) => {
    try {
      const sqlPros = _.chain(ListPro)
        .map((pro_id) => {
          return `pro_id = '${pro_id}'`;
        })
        .compact()
        .join(" OR ")
        .value();

      const sql = `update ${TABLE_NAME}.ProductInf set isDelete=1 where ${sqlPros}`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion

  //#region editProduct
  editProduct = async (
    pro_id,
    pro_comName,
    pro_homemadeName,
    type_id,
    pro_cost,
    pro_price,
    pro_img,
    pro_style
  ) => {
    try {
      const sql = `update ${TABLE_NAME}.Product set 
      pro_comName=:pro_comName,
      pro_homemadeName=:pro_homemadeName,
      type_id=:type_id,
      pro_cost=:pro_cost,
      pro_price=:pro_price,
      pro_style=:pro_style
        where pro_id=:pro_id`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          pro_id,
          pro_comName,
          pro_homemadeName,
          type_id,
          pro_cost,
          pro_price,
          pro_style: JSON.stringify(pro_style),
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  getAllProductInf = async (pro_id) => {
    try {
      const sql = `select * from ${TABLE_NAME}.ProductInf where pro_id='${pro_id}'`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  isDeleteProductInf = async (pro_id) => {
    try {
      const sql = `delete from ${TABLE_NAME}.ProductInf where pro_id='${pro_id}'`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.DELETE,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  editProductInf = async (com_id, pro_id, pro_style, oldData, pro_comName) => {
    try {
      console.log(com_id, pro_id, pro_style, oldData);
      let sql = "";
      if (_.isEmpty(pro_style)) {
        sql = `insert into ${TABLE_NAME}.ProductInf (com_id,pro_id,pro_quantity,pro_barcode,pro_comName) values (${com_id},'${pro_id}',${
          oldData[0].pro_size ? 0 : oldData[0].pro_quantity
        },'${
          oldData[0].pro_size ? generate.UUID() : oldData[0].pro_barcode
        }','${pro_comName}')`;
      } else {
        const sqlComs = _.chain(pro_style.color)
          .map((pro_color) => {
            return _.map(pro_style.size, (pro_size) => {
              const oldPro = _.map(oldData, (data) => {
                console.log(data, pro_color, pro_size);
                if (
                  data.pro_color === pro_color &&
                  data.pro_size === pro_size.toString()
                ) {
                  return data;
                }
              }).filter((quantity) => quantity !== undefined);
              return `(
                '${com_id}',
                '${pro_id}',
                '${pro_color}',
                '${pro_size}',
                '${oldPro[0]?.pro_quantity ? oldPro[0]?.pro_quantity : 0}',
                '${
                  oldPro[0]?.pro_barcode
                    ? oldPro[0]?.pro_barcode
                    : generate.UUID()
                }',
                '${pro_comName}'
              )`;
            });
          })
          .flatten()
          .compact()
          .join(",")
          .value();
        sql = `insert into ${TABLE_NAME}.ProductInf (com_id,pro_id,pro_color,pro_size,pro_quantity,pro_barcode,pro_comName) values ${sqlComs}`;
      }
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };
  //#endregion

  getaddProductId = async (com_id, pro_comName) => {
    try {
      const sql = `select pro_id from ${TABLE_NAME}.Product where com_id=${com_id} and pro_comName='${pro_comName}'`;
      const sqlResult = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return sqlResult;
    } catch (err) {
      return err.message;
    }
  };

  editProductImg = async (pro_id, pro_img) => {
    try {
      const sql = `update ${TABLE_NAME}.Product set 
      pro_img=:pro_img
        where pro_id=:pro_id`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          pro_id,
          pro_img,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };

  deleteProductImg = async (ListPro) => {
    try {
      const sqlPros = _.chain(ListPro)
        .map((pro_id) => {
          return `pro_id = '${pro_id}'`;
        })
        .compact()
        .join(" OR ")
        .value();
      const sql = `update ${TABLE_NAME}.Product set 
      pro_img=${null}
        where ${sqlPros}`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new IsDeleteRepository();
