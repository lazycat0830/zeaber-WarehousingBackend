var _ = require("lodash");
var CompanyRepository = require("../repositories/CompanyRepository");

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
}

module.exports = new CompanyService();
