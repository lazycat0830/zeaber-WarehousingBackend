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

module.exports = { getInventory, editInfQuantity };
