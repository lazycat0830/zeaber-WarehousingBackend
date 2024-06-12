var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const SettingService = require("../Serviecs/SettingService");

async function getInformation(req, res) {
  const response = await SettingService.getInformation();
  return formatResponseUtil.formatResponse(res, response);
}

async function getSettingPay(req, res) {
  const response = await SettingService.getSettingPay();
  return formatResponseUtil.formatResponse(res, response);
}

async function addSettingPay(req, res) {
  const bodyKey = ["setpay_name"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");
  const { setpay_name } = req.body;
  const response = await SettingService.addSettingPay(setpay_name);
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  getInformation,
  getSettingPay,
  addSettingPay,
};
