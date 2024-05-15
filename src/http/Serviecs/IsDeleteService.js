var _ = require("lodash");
var IsDeleteRepository = require("../repositories/IsDeleteRepository");
var convertFormat = require("../../utils/convertFormat");

class IsDeleteService {
  delIsDelete = async () => {
    try {
      const result = {};
      const tables = ["ProductInf", "Product", "Company", "Purchase"];
      for (const table of tables) {
        const data = await IsDeleteRepository.delIsDelete(table);
        result[table] = typeof data === "object" ? "清除成功" : data;
      }
      if (!result) {
        return {
          status: 404,
          data: null,
        };
      } else if (typeof result === "string") {
        return {
          status: 500,
          message: result,
        };
      } else if (typeof result === "object") {
        return {
          status: 200,
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  };
}

module.exports = new IsDeleteService();
