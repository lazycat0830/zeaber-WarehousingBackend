var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const OrderMeanControllers = require("../http/controllers/OrderMeanController");
const router = express.Router();

var multer = require("multer");
var upload = multer({
  storage: multer.memoryStorage(),
  limit: {
    fileSize: 10000000,
  },
});

/**
 * @api {get} http://0.0.0.0/api/OrderMean/getAllOrder
 * @apiName 取得所有訂單
 * @apiGroup A01
 *
 */
router.get("/getAllOrder", OrderMeanControllers.getAllOrder);

/**
 * @api {post} http://0.0.0.0/api/OrderMean/addOrder
 * @apiName 建立銷售訂單
 * @apiGroup A01
 *
 * @apiParam {number} ord_pay  金額
 * @apiParam {number} pay_type  付款類型
 * @apiParam {string} pay_sts 付款狀態 (pay 已付款,nopay 未付款,deposit 已付訂金,refund 退款)
 * @apiParam {string} ord_sts (0 暫存 1 完成)
 * @apiParam {string} ord_remark  備註
 * @apiParam {string} ord_receipt  發票編號
 * @apiParam {string} ord_GUInum  統一編號
 * @apiParam {string} user_name  操作者名稱
 * @apiParam {number} user_id  操作者編號
 * @apiParam {array} product  訂單商品 [{"com_id":2,"pro_id":"A765DF31-7ACE-48A1-9DE5-B422F1681284","pro_color":"紅","pro_size":"40","pro_quantity":2,"pro_cost":230,"pro_price":390,"discount":0}]
 * @apiParam {file} ord_detailsPDF  交易明細
 *
 */
router.post(
  "/addOrder",
  upload.single("ord_detailsPDF"),
  OrderMeanControllers.addOrder
);

/**
 * @api {post} http://0.0.0.0/api/OrderMean/editStsOrder
 * @apiName 修改暫存訂單
 * @apiGroup A01
 *
 * @apiParam {string} ord_id  訂單編號
 * @apiParam {number} ord_pay  金額
 * @apiParam {number} pay_type  付款類型
 * @apiParam {string} pay_sts 付款狀態 (pay 已付款,nopay 未付款,deposit 已付訂金,refund 退款)
 * @apiParam {string} ord_sts (0 暫存 1 完成)
 * @apiParam {string} ord_remark  備註
 * @apiParam {string} ord_receipt  發票編號
 * @apiParam {string} ord_GUInum  統一編號
 * @apiParam {string} user_name  操作者名稱
 * @apiParam {number} user_id  操作者編號
 * @apiParam {array} product  訂單商品 [{"com_id":2,"pro_id":"A765DF31-7ACE-48A1-9DE5-B422F1681284","pro_color":"紅","pro_size":"40","pro_quantity":2,"pro_cost":230,"pro_price":390,"discount":0}]
 * @apiParam {file} ord_detailsPDF  交易明細
 *
 */
router.post(
  "/editStsOrder",
  upload.single("ord_detailsPDF"),
  OrderMeanControllers.editStsOrder
);

/**
 * @api {put} http://0.0.0.0/api/OrderMean/cancelOrder
 * @apiName 取得所有訂單
 * @apiGroup A01
 *
 * @apiParam {string} ord_id  訂單編號
 *
 */
router.put("/cancelOrder", OrderMeanControllers.cancelOrder);

module.exports = router;
