var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const InventoryService = require("../Serviecs/InventoryService");

async function getInventory(req, res) {
  const response = await InventoryService.getInventory();
  return formatResponseUtil.formatResponse(res, response);
}

async function editInfQuantity(req, res) {
  const bodyKey = ["com_id", "pro_id", "inf_id", "pro_quantity"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { com_id, pro_id, inf_id, pro_quantity } = req.body;
  const response = await InventoryService.editInfQuantity(
    com_id,
    pro_id,
    inf_id,
    pro_quantity
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function addPurchase(req, res) {
  const bodyKey = [
    "pur_type",
    "user_name",
    "user_id",
    "product",
    "pur_allquantity",
    "pro_allquantity",
    "pro_allCost",
    "insertDate",
  ];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const {
    pur_type,
    user_name,
    user_id,
    product,
    pur_allquantity,
    pro_allquantity,
    pro_allCost,
    insertDate,
  } = req.body;
  const response = await InventoryService.addPurchase(
    pur_type,
    user_name,
    user_id,
    JSON.stringify(product),
    pur_allquantity,
    pro_allquantity,
    pro_allCost,
    insertDate
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function finishPurchase(req, res) {
  const bodyKey = ["pur_id", "pur_type", "product"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { pur_id, pur_type, product } = req.body;
  const response = await InventoryService.finishPurchase(
    pur_id,
    pur_type,
    product
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function deletePurchase(req, res) {
  const bodyKey = ["pur_id"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { pur_id } = req.body;
  const response = await InventoryService.deletePurchase(pur_id);
  return formatResponseUtil.formatResponse(res, response);
}

async function getAllPurchase(req, res) {
  const response = await InventoryService.getAllPurchase();
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  getInventory,
  editInfQuantity,
  addPurchase,
  finishPurchase,
  deletePurchase,
  getAllPurchase,
};
