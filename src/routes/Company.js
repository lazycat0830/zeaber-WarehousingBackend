var express = require("express");
var jwt = require("../middlewares/jwtAuthMiddleware");
const { jwtAuth } = jwt;
const CompanyControllers = require("../http/controllers/CompanyController");
const router = express.Router();

/**
 * @api {get} http://0.0.0.0/api/Company/getAllCompany
 * @apiName 取得所有廠商
 * @apiGroup A01
 *
 */
router.get("/getAllCompany", CompanyControllers.getAllCompany);

module.exports = router;
