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
      const result = await InventoryRepository.addPurchase(
        pur_type,
        user_name,
        user_id,
        product,
        pur_allquantity,
        pro_allquantity,
        pro_allCost,
        insertDate
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
          data: `${pur_type ? "進貨單" : "退貨單"}新增成功`,
        };
      }
    } catch {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };
  finishPurchase = async (pur_id, pur_type, product) => {
    try {
      const result = await InventoryRepository.finishPurchase(pur_id, product);
      const oldInf = await InventoryRepository.getOldProductInf(product);
      await Promise.all(
        product.map(async (proInf) => {
          const oldpro = _.filter(oldInf, {
            pro_color: proInf.pro_color,
            pro_size: proInf.pro_size,
          });
          await InventoryRepository.putInfQuantity(proInf, oldpro[0], pur_type);
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
          message: result,
        };
      } else if (typeof result === "object") {
        return {
          status: 200,
          data: "入庫完成",
        };
      }
    } catch {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };
  deletePurchase = async (pur_id) => {
    try {
      const result = await InventoryRepository.deletePurchase(pur_id);

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
          data: "刪除成功",
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
