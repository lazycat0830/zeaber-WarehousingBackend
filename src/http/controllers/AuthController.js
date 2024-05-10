var _ = require("lodash");
var checkedValidationUtil = require("../../utils/checkedValidation");
var formatResponseUtil = require("../../utils/formatResponseUtil");
var AuthService = require("../Serviecs/AuthService");

async function Login(req, res) {
  const queryKey = ["account"];
  if (!checkedValidationUtil.keyChecked(queryKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");
  const { account } = req.body;
  const response = await AuthService.Login(account);

  return formatResponseUtil.formatResponse(res, response);
}

async function Register(req, res) {
  const bodyKey = ["account", "password", "name", "email", "role"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { account, password, name, email, role } = req.body;

  const response = await AuthService.Register(
    account,
    password,
    name,
    email,
    role
  );

  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  Login,
  Register,
};
