var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const CompanyService = require("../Serviecs/CompanyService");

async function getAllCompany(req, res) {
  const response = await CompanyService.getAllCompany();
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  getAllCompany,
};
