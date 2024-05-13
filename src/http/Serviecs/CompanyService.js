var _ = require("lodash");
var CompanyRepository = require("../repositories/CompanyRepository");
var convertFormat = require("../../utils/convertFormat");

class CompanyService {
  getAllCompany = async () => {
    try {
      const result = await CompanyRepository.getAllCompany();
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
  addCompany = async (
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay
  ) => {
    try {
      const result = await CompanyRepository.addCompany(
        com_homemadeName,
        com_name,
        com_address,
        com_phone,
        discount,
        payDay
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
      const result = await CompanyRepository.editCompany(
        com_id,
        com_homemadeName,
        com_name,
        com_address,
        com_phone,
        discount,
        payDay
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
  deleteCompany = async (ListCom) => {
    try {
      // ListCom.forEach(async (com_id) => {
      //   const ProIds = await CompanyRepository.getPro_idList(com_id);
      //   const ListPro = ProIds.map((item) => item.pro_id);
      //   await ProductRepository.deleteProduct(com_id, ListPro);
      // });
      const result = await CompanyRepository.deleteCompany(ListCom);
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
  csvAddCompany = async (csvFile) => {
    try {
      const ListCompany = await convertFormat.csvConvertArray(csvFile);
      const result = await CompanyRepository.csvAddCompany(ListCompany);
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
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  };
}

module.exports = new CompanyService();
