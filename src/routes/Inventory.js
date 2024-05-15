var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const InventoryControllers = require("../http/controllers/InventoryController");
const router = express.Router();

/**
 * @api {get} http://0.0.0.0/api/Inventory/getInventory
 * @apiName 取得庫存資料
 * @apiGroup A01
 *
 */
router.get("/getInventory", InventoryControllers.getInventory);

/**
 * @api {get} http://0.0.0.0/api/Inventory/editInfQuantity
 * @apiName 修改庫存數量
 * @apiGroup A01
 *
 * @apiParam {string} pro_id
 * @apiParam {number} com_id
 * @apiParam {number} inf_id
 * @apiParam {number} pro_quantity
 */
router.put("/editInfQuantity", InventoryControllers.editInfQuantity);

/**
 * @api {get} http://0.0.0.0/api/Inventory/addPurchase
 * @apiName 新增進退貨單
 * @apiGroup A01
 *
 * @apiParam {bit} pur_type 1:進貨 0:退貨
 * @apiParam {string} user_name 使用者名稱
 * @apiParam {number} user_id 使用者編號
 * @apiParam {array} product 選擇的產品 [{pro_id:"",pro_color:"紅",pro_size:"40",pro_quantity:2},{pro_id:"",pro_color:"紅",pro_size:"41",pro_quantity:2}]
 * @apiParam {number} pur_allquantity 貨單數量
 * @apiParam {number} pro_allquantity 現有數量
 * @apiParam {number} pro_allCost 貨單成本
 * @apiParam {DateTime} insertDate 建立時間
 */
router.post("/addPurchase", InventoryControllers.addPurchase);

/**
 * @api {post} http://0.0.0.0/api/Inventory/finishPurchase
 * @apiName 完成進退貨單 入庫
 * @apiGroup A01
 *
 * @apiParam {number} pur_id 貨單編號
 * @apiParam {bit} pur_type 1:進貨 0:退貨
 * @apiParam {array} product 選擇的產品 [{pro_id:"",pro_color:"紅",pro_size:"40",pro_quantity:2},{pro_id:"",pro_color:"紅",pro_size:"41",pro_quantity:2}]
 */
router.post("/finishPurchase", InventoryControllers.finishPurchase);

/**
 * @api {put} http://0.0.0.0/api/Inventory/deletePurchase
 * @apiName 刪除進退貨單
 * @apiGroup A01
 *
 * @apiParam {number} pur_id 貨單編號
 *
 */
router.put("/deletePurchase", InventoryControllers.deletePurchase);

module.exports = router;
