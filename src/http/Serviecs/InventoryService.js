var _ = require("lodash");
var InventoryRepository = require("../repositories/InventoryRepository");
var convertFormat = require("../../utils/convertFormat");

class InventoryService {
  getInventory = async () => {
    try {
      const result = await InventoryRepository.getAllProduct();
      const data = await convertFormat.convertData(result);
      await Promise.all(
        data.map(async (product) => {
          product["data"] = await InventoryRepository.getInventory(
            product.pro_id
          );
        })
      );
      if (!result) {
        return {
          status: 404,
          data: null,
        };
      } else if (typeof result === "string") {
        return {
          status: 500,
          message: data,
        };
      } else if (typeof result === "object") {
        return {
          status: 200,
          data: data,
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  };
  editInfQuantity = async (com_id, pro_id, inf_id, pro_quantity) => {
    try {
      const result = await InventoryRepository.editInfQuantity(
        com_id,
        pro_id,
        inf_id,
        pro_quantity
      );
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
          data: "修改成功",
        };
      }
    } catch {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };
}
module.exports = new InventoryService();
