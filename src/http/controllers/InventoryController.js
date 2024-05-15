var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const InventoryService = require("../Serviecs/InventoryService");

async function getInventory(req, res) {
  const response = await InventoryService.getInventory();
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = { getInventory };
