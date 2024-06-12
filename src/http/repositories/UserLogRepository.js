const sequelize = require("../../config/db");
const TABLE_NAME = "dbo";

class UserLogRepository {
  UserLog = async (name, role, action) => {
    try {
      const sql = `
        INSERT INTO ${TABLE_NAME}.user_log (name, role, action) 
        VALUES (${name}, ${role}, ${action});
      `;
      return await sequelize.query(sql);
    } catch (err) {
      console.error("UserLog error:", err);
      return err.message;
    }
  };
}

module.exports = new UserLogRepository();
