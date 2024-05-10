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
router.post(
  "/login",
  //   (req, res, next) => {
  //     Passport.authenticate("local", { session: false }, (err, account, info) => {
  //       if (err) {
  //         res.send(err);
  //         return;
  //       }
  //       if (!account) {
  //         let response = "";
  //         const statusCode = _.get(info, "status", 500);
  //         if (statusCode === 401) {
  //           response = {
  //             status: statusCode,
  //             message: "帳號或密碼錯誤",
  //           };
  //           return formatResponseUtil.formatResponse(res, response);
  //         } else if (statusCode === 404) {
  //           response = {
  //             status: statusCode,
  //             message: "查無此用戶",
  //           };
  //           return formatResponseUtil.formatResponse(res, response);
  //         }
  //         response = {
  //           status: statusCode,
  //           message: "系統錯誤",
  //         };
  //         return formatResponseUtil.formatResponse(res, response);
  //       }

  //       // 身份验证成功时调用 next() 函数将控制权传递给下一个处理程序
  //       next();
  //     })(req, res);
  //   },
  AuthController.Login
);

module.exports = router;
