var _ = require("lodash");
var ProductTypeRepository = require("../repositories/ProductTypeRepository");
var convertFormat = require("../../utils/convertFormat");

class ProductTypeService {
  addProductType = async (type_title) => {
    try {
      const result = await ProductTypeRepository.addProductType(type_title);
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
          data: "新增成功",
        };
      }
    } catch {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };
  getAllProductType = async () => {
    try {
      const result = await ProductTypeRepository.getAllProductType();
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
    } catch {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };
  editProductType = async (type_id, type_title) => {
    try {
      const result = await ProductTypeRepository.editProductType(
        type_id,
        type_title
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
  delProductType = async (ListTypeId) => {
    try {
      const result = await ProductTypeRepository.delProductType(ListTypeId);
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

module.exports = new ProductTypeService();
