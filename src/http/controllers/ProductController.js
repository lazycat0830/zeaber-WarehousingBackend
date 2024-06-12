var _ = require("lodash");
const formatResponseUtil = require("../../utils/formatResponseUtil");
const checkedValidationUtil = require("../../utils/checkedValidation");
const ProductService = require("../Serviecs/ProductService");

async function addProduct(req, res) {
  const bodyKey = ["com_id", "pro_comName", "pro_cost", "pro_price"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const {
    com_id,
    pro_comName,
    pro_homemadeName,
    type_id,
    pro_cost,
    pro_price,
    pro_style,
  } = req.body;
  const pro_img = req?.file?.buffer;
  const response = await ProductService.addProduct(
    com_id,
    pro_comName,
    pro_homemadeName,
    type_id,
    pro_cost,
    pro_price,
    pro_img,
    JSON.parse(pro_style)
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function getAllProduct(req, res) {
  const response = await ProductService.getAllProduct();
  return formatResponseUtil.formatResponse(res, response);
}

async function deleteProduct(req, res) {
  const bodyKey = ["ListPro"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");

  const { ListPro } = req.body;
  const response = await ProductService.deleteProduct(ListPro);
  return formatResponseUtil.formatResponse(res, response);
}

async function editProduct(req, res) {
  const bodyKey = ["pro_id", "com_id", "pro_comName", "pro_cost", "pro_price"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");
  const {
    pro_id,
    com_id,
    pro_comName,
    pro_homemadeName,
    type_id,
    pro_cost,
    pro_price,
    pro_style,
  } = req.body;
  const pro_img = req?.file?.buffer;
  const response = await ProductService.editProduct(
    pro_id,
    com_id,
    pro_comName,
    pro_homemadeName,
    type_id,
    pro_cost,
    pro_price,
    pro_img,
    JSON.parse(pro_style)
  );
  return formatResponseUtil.formatResponse(res, response);
}

async function csvAddProduct(req, res) {
  const csvFile = req?.file.buffer;
  const { com_id } = req.body;
  const response = await ProductService.csvAddProduct(csvFile, com_id);
  return formatResponseUtil.formatResponse(res, response);
}

async function editProductImg(req, res) {
  const bodyKey = ["pro_id"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");
  const { pro_id } = req.body;
  const pro_img = req?.file.buffer;
  const response = await ProductService.editProductImg(pro_id, pro_img);
  return formatResponseUtil.formatResponse(res, response);
}

async function deleteProductImg(req, res) {
  const bodyKey = ["ListPro"];
  if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
    return formatResponseUtil.keyErrorResponse(res, "欄位格式有誤，請檢查");
  const { ListPro } = req.body;
  const response = await ProductService.deleteProductImg(ListPro);
  return formatResponseUtil.formatResponse(res, response);
}

module.exports = {
  addProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
  csvAddProduct,
  editProductImg,
  deleteProductImg,
};
