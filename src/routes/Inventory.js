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

module.exports = router;
