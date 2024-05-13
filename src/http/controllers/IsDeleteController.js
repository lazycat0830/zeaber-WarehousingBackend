var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const IsDeleteService = require("../Serviecs/IsDeleteService");

async function delIsDelete(req, res) {
  const response = await IsDeleteService.delIsDelete();
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  delIsDelete,
};
