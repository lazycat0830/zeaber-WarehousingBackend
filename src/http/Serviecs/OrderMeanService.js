var _ = require("lodash");
var OrderMeanRepository = require("../repositories/OrderMeanRepository");
var InventoryRepository = require("../repositories/InventoryRepository");
var convertFormat = require("../../utils/convertFormat");

class OrderMeanService {
  getAllOrder = async () => {
    try {
      const result = await OrderMeanRepository.getAllOrder();

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
      const result = await OrderMeanRepository.addOrder(
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
      );
      if (parseInt(ord_sts)) {
        const oldInf = await InventoryRepository.getOldProductInf(product);
        await Promise.all(
          product.map(async (proInf) => {
            const oldpro = _.filter(oldInf, {
              pro_color: proInf.pro_color,
              pro_size: proInf.pro_size,
            });
            await InventoryRepository.putInfQuantity(proInf, oldpro[0], 0);
          })
        );
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
          data: "建立訂單",
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  };
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
      const result = await OrderMeanRepository.editStsOrder(
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
      );
      if (parseInt(ord_sts)) {
        const oldInf = await InventoryRepository.getOldProductInf(product);
        await Promise.all(
          product.map(async (proInf) => {
            const oldpro = _.filter(oldInf, {
              pro_color: proInf.pro_color,
              pro_size: proInf.pro_size,
            });
            await InventoryRepository.putInfQuantity(proInf, oldpro[0], 0);
          })
        );
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
          data: "修改訂單成功",
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  };
  cancelOrder = async (ord_id) => {
    try {
      const order = await OrderMeanRepository.getOrder(ord_id);
      const result = await OrderMeanRepository.cancelOrder(ord_id);
      const product = JSON.parse(order[0].product);
      if (!_.isEqual(product)) {
        const oldInf = await InventoryRepository.getOldProductInf(product);
        await Promise.all(
          product.map(async (proInf) => {
            const oldpro = _.filter(oldInf, {
              pro_color: proInf.pro_color,
              pro_size: proInf.pro_size,
            });
            await InventoryRepository.putInfQuantity(proInf, oldpro[0], 1);
          })
        );
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
          data: "取消訂單",
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

module.exports = new OrderMeanService();
