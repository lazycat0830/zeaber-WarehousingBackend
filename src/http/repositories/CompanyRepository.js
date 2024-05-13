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
  addCompany = async (
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay
  ) => {
    try {
      const sql = `insert into ${TABLE_NAME}.Company
        (
            com_homemadeName,
            com_name,
            com_address,
            com_phone,
            discount,
            payDay
        ) values 
        (
            :com_homemadeName,
            :com_name,
            :com_address,
            :com_phone,
            :discount,
            :payDay
        )`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
          com_homemadeName: com_homemadeName,
          com_name: com_name,
          com_address: com_address,
          com_phone: com_phone,
          discount: discount,
          payDay: payDay,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  editCompany = async (
    com_id,
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay
  ) => {
    try {
      const sql = `update ${TABLE_NAME}.Company set 
        com_homemadeName=:com_homemadeName,
        com_name=:com_name,
        com_address=:com_address,
        com_phone=:com_phone,
        discount=:discount,
        payDay=:payDay 
        where com_id=:com_id`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
          com_id: com_id,
          com_homemadeName: com_homemadeName,
          com_name: com_name,
          com_address: com_address,
          com_phone: com_phone,
          discount: discount,
          payDay: payDay,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };

  deleteCompany = async (ListCom) => {
    try {
      const sqlPros = _.chain(ListCom)
        .map((com_id) => {
          return `com_id = '${com_id}'`;
        })
        .compact()
        .join(" OR ")
        .value();

      const sql = `update ${TABLE_NAME}.Company set isDelete=1 where ${sqlPros}`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.UPDATE,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };

  csvAddCompany = async (ListCompany) => {
    try {
      const sqlComs = _.chain(ListCompany)
        .map((company) => {
          return `(
                '${company.com_homemadeName}',
                '${company.com_name}',
                '${company.com_address}',
                '${company.com_phone}',
                ${company.discount},
                ${company.payDay}
                )`;
        })
        .compact()
        .join(",")
        .value();

      const sql = `insert into ${TABLE_NAME}.Company
        (
            com_homemadeName,
            com_name,
            com_address,
            com_phone,
            discount,
            payDay
        ) values ${sqlComs}
        `;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
  getPro_idList = async (com_id) => {
    try {
      const sql = `select pro_id from ${TABLE_NAME}.Product  where com_id = ${com_id}`;
      const result = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  };
}

module.exports = new CompanyRepository();
