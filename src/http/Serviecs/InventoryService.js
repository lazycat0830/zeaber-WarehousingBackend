var _ = require("lodash");
var InventoryRepository = require("../repositories/InventoryRepository");
var convertFormat = require("../../utils/convertFormat");

class InventoryService {
  getInventory = async () => {
    try {
      const result = await InventoryRepository.getInventory();
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
module.exports = new InventoryService();
