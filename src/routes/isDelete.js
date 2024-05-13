var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const IsDeleteControllers = require("../http/controllers/IsDeleteController");
const router = express.Router();

//清資料庫空間
/**
 * @api {delete} http://0.0.0.0/api/IsDelete/delIsDelete
 * @apiName 清除假刪除資料
 * @apiGroup A01
 *
 *
 */
router.delete("/delIsDelete", IsDeleteControllers.delIsDelete);

module.exports = router;
