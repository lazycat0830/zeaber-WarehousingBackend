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

module.exports = router;
