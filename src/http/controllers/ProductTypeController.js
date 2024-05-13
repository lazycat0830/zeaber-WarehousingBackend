var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const ProductTypeService = require("../Serviecs/ProductTypeService");

async function addProductType(req, res) {
  const bodyKey = ["type_title"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { type_title } = req.body;
  const response = await ProductTypeService.addProductType(type_title);
  return formatResponseUtil.formatResponse(res, response);
}

async function getAllProductType(req, res) {
  const response = await ProductTypeService.getAllProductType();
  return formatResponseUtil.formatResponse(res, response);
}

async function editProductType(req, res) {
  const bodyKey = ["type_id", "type_title"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { type_id, type_title } = req.body;
  const response = await ProductTypeService.editProductType(
    type_id,
    type_title
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function delProductType(req, res) {
  const bodyKey = ["ListTypeId"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { ListTypeId } = req.body;
  const response = await ProductTypeService.delProductType(ListTypeId);
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  addProductType,
  getAllProductType,
  editProductType,
  delProductType,
};
