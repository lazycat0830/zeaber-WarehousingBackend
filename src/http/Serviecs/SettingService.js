var _ = require("lodash");
var SettingRepository = require("../repositories/SettingRepository");
var convertFormat = require("../../utils/convertFormat");

class SettingService {
  getInformation = async () => {
    try {
      const result = await SettingRepository.getInformation();
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

  getSettingPay = async () => {
    try {
      const result = await SettingRepository.getSettingPay();
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

  addSettingPay = async (setpay_name) => {
    try {
      const result = await SettingRepository.addSettingPay(setpay_name);
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

module.exports = new SettingService();
