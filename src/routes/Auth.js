var express = require("express");
var _ = require("lodash");
var Passport = require("passport");

var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
var formatResponseUtil = require("../utils/formatResponseUtil");
var AuthController = require("../http/controllers/AuthController");

const router = express.Router();

/**
 * @api {POST} http://0.0.0.0/api/Auth/login 登入
 * @apiName 登入
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} account  帳號
 * @apiParam {String} password  密碼
 *
 * @apiSuccessExample 成功回傳
 */
router.post("/login", AuthController.Login);

/**
 * @api {POST} http://0.0.0.0/api/Auth/register 註冊
 * @apiName 註冊
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} account  帳號
 * @apiParam {String} password  密碼
 * @apiParam {String} name  名字
 * @apiParam {String} email  郵件
 * @apiParam {String} role  身分
 *
 * @apiSuccessExample 成功回傳
 */
router.post("/register", AuthController.Register);

module.exports = router;
