var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const OrderMeanService = require("../Serviecs/OrderMeanService");

async function getAllOrder(req, res) {
  const response = await OrderMeanService.getAllOrder();
  return formatResponseUtil.formatResponse(res, response);
}

async function addOrder(req, res) {
  const bodyKey = [
    "ord_pay",
    "pay_type",
    "ord_sts",
    "user_name",
    "user_id",
    "product",
  ];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const {
    ord_pay,
    pay_type,
    pay_sts,
    ord_sts,
    ord_remark,
    ord_receipt,
    ord_GUInum,
    user_name,
    user_id,
    product,
  } = req.body;
  const ord_detailsPDF = req.file?.buffer;
  const response = await OrderMeanService.addOrder(
    ord_pay,
    pay_type,
    pay_sts,
    ord_sts,
    ord_remark,
    ord_receipt,
    ord_GUInum,
    user_name,
    user_id,
    JSON.parse(product),
    ord_detailsPDF
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function editStsOrder(req, res) {
  const bodyKey = [
    "ord_id",
    "ord_pay",
    "pay_type",
    "ord_sts",
    "user_name",
    "user_id",
    "product",
  ];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const {
    ord_id,
    ord_pay,
    pay_type,
    pay_sts,
    ord_sts,
    ord_remark,
    ord_receipt,
    ord_GUInum,
    user_name,
    user_id,
    product,
  } = req.body;
  const ord_detailsPDF = req.file?.buffer;
  const response = await OrderMeanService.editStsOrder(
    ord_id,
    ord_pay,
    pay_type,
    pay_sts,
    ord_sts,
    ord_remark,
    ord_receipt,
    ord_GUInum,
    user_name,
    user_id,
    JSON.parse(product),
    ord_detailsPDF
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function cancelOrder(req, res) {
  const bodyKey = ["ord_id"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { ord_id } = req.body;

  const response = await OrderMeanService.cancelOrder(ord_id);
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  getAllOrder,
  addOrder,
  editStsOrder,
  cancelOrder,
};
