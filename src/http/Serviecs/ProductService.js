var _ = require("lodash");
var ProductRepository = require("../repositories/ProductRepository");
var convertFormat = require("../../utils/convertFormat");

class ProductService {
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
      const ProductResult = await ProductRepository.addProduct(
        com_id,
        pro_comName,
        pro_homemadeName,
        type_id,
        pro_cost,
        pro_price,
        pro_img,
        pro_style
      );
      const addProductData = await ProductRepository.getaddTopProductId();
      const ProductInfResult = await ProductRepository.addProductInf(
        com_id,
        pro_comName,
        addProductData[0].pro_id,
        pro_style
      );
      if (!(ProductResult && ProductInfResult)) {
        return {
          status: 404,
          data: null,
        };
      } else if (
        typeof ProductResult === "string" ||
        typeof ProductInfResult === "string"
      ) {
        return {
          status: 500,
          message: {
            product: ProductResult,
            productInf: ProductInfResult,
          },
        };
      } else if (
        typeof ProductResult === "object" &&
        typeof ProductInfResult === "object"
      ) {
        return {
          status: 200,
          data: {
            product: "新增成功",
            productInf: "新增成功",
          },
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  };
  getAllProduct = async () => {
    try {
      const result = await ProductRepository.getAllProduct();
      const data = await convertFormat.convertData(result);
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
  deleteProduct = async (ListPro) => {
    try {
      await ProductRepository.deleteProductInf(ListPro);
      const result = await ProductRepository.deleteProduct(ListPro);
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
  editProduct = async (
    pro_id,
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
      const ProductResult = await ProductRepository.editProduct(
        pro_id,
        pro_comName,
        pro_homemadeName,
        type_id,
        pro_cost,
        pro_price,
        pro_img,
        pro_style
      );
      const oldData = await ProductRepository.getAllProductInf(pro_id);
      await ProductRepository.isDeleteProductInf(pro_id);
      const ProductInfResult = await ProductRepository.editProductInf(
        com_id,
        pro_id,
        pro_style,
        oldData,
        pro_comName
      );
      if (!ProductResult || !ProductInfResult) {
        return {
          status: 404,
          data: null,
        };
      } else if (
        typeof ProductResult === "string" ||
        typeof ProductInfResult === "string"
      ) {
        return {
          status: 500,
          message: {
            prduct: ProductResult,
            prductInf: ProductInfResult,
          },
        };
      } else if (
        typeof ProductResult === "object" &&
        typeof ProductInfResult === "object"
      ) {
        return {
          status: 200,
          data: {
            prduct: "修改成功",
            prductInf: "修改成功",
          },
        };
      }
    } catch {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };

  csvAddProduct = async (csvFile, com_id) => {
    try {
      const data = [];
      const ListProduct = await convertFormat.csvConvertArray(csvFile);
      _.map(ListProduct, async (product, i) => {
        product["pro_style"] = JSON.stringify({
          color: product["color"].includes(" ")
            ? product["color"].split(" ")
            : product["color"].split(),
          size: product["size"].includes(" ")
            ? product["size"].split(" ")
            : product["size"].split(),
        });
        if (product.pro_style === '{"color":[""],"size":[""]}') {
          product.pro_style = "{}";
        }
        const ProductResult = await ProductRepository.addProduct(
          com_id,
          product.pro_comName,
          product.pro_homemadeName,
          product.type_id,
          product.pro_cost,
          product.pro_price,
          null,
          product.pro_style
        );
        const addProductData = await ProductRepository.getaddProductId(
          com_id,
          product.pro_comName
        );
        const ProductInfResult = await ProductRepository.addProductInf(
          com_id,
          product.pro_comName,
          addProductData[0].pro_id,
          JSON.parse(product.pro_style)
        );
        data.push({
          name: product.pro_comName,
          id: addProductData[0].pro_id,
          result: ProductResult,
          Infresult: ProductInfResult,
        });
      });
      if (!data) {
        return {
          status: 404,
          data: null,
        };
      } else if (typeof data === "string") {
        return {
          status: 500,
          message: data,
        };
      } else if (typeof data === "object") {
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

  editProductImg = async (pro_id, pro_img) => {
    try {
      const Result = await ProductRepository.editProductImg(pro_id, pro_img);
      if (!Result) {
        return {
          status: 404,
          data: null,
        };
      } else if (typeof Result === "string") {
        return {
          status: 500,
          message: Result,
        };
      } else if (typeof Result === "object") {
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

  deleteProductImg = async (ListPro) => {
    try {
      const Result = await ProductRepository.deleteProductImg(ListPro);
      if (!Result) {
        return {
          status: 404,
          data: null,
        };
      } else if (typeof Result === "string") {
        return {
          status: 500,
          message: Result,
        };
      } else if (typeof Result === "object") {
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

module.exports = new ProductService();
