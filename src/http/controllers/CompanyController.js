var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const CompanyService = require("../Serviecs/CompanyService");

async function getAllCompany(req, res) {
  const response = await CompanyService.getAllCompany();
  return formatResponseUtil.formatResponse(res, response);
}

async function addCompany(req, res) {
  const bodyKey = ["com_name", "discount", "payDay"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const {
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay,
  } = req.body;
  const response = await CompanyService.addCompany(
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function editCompany(req, res) {
  const bodyKey = ["com_id", "com_name", "discount", "payDay"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const {
    com_id,
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay,
  } = req.body;
  const response = await CompanyService.editCompany(
    com_id,
    com_homemadeName,
    com_name,
    com_address,
    com_phone,
    discount,
    payDay
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function deleteCompany(req, res) {
  const bodyKey = ["ListCom"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { ListCom } = req.body;
  const response = await CompanyService.deleteCompany(ListCom);
  return formatResponseUtil.formatResponse(res, response);
}

async function csvAddCompany(req, res) {
  const csvFile = req?.file.buffer;
  const response = await CompanyService.csvAddCompany(csvFile);
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  addCompany,
  getAllCompany,
  editCompany,
  deleteCompany,
  csvAddCompany,
};
