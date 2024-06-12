var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const SettingControllers = require("../http/controllers/SettingController");
const router = express.Router();

/**
 * @api {get} http://0.0.0.0/api/Setting/getInformation
 * @apiName 取得公司基本資料
 * @apiGroup A01
 *
 */
router.get("/getInformation", SettingControllers.getInformation);

/**
 * @api {get} http://0.0.0.0/api/Setting/getSettingPay
 * @apiName 取得付款設定
 * @apiGroup A01
 *
 */
router.get("/getSettingPay", SettingControllers.getSettingPay);

/**
 * @api {post} http://0.0.0.0/api/Setting/addSettingPay
 * @apiName 取得付款設定
 * @apiGroup A01
 *
 */
router.post("/addSettingPay", SettingControllers.addSettingPay);

module.exports = router;
