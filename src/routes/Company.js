var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const CompanyControllers = require("../http/controllers/CompanyController");
const router = express.Router();

// router.use(jwtAuth("jwt"));

/**
 * @api {get} http://0.0.0.0/api/Company/getAllCompany
 * @apiName 取得所有廠商
 * @apiGroup A01
 *
 */
router.get("/getAllCompany", CompanyControllers.getAllCompany);

module.exports = router;
