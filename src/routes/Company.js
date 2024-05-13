var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const CompanyControllers = require("../http/controllers/CompanyController");
const router = express.Router();

// router.use(jwtAuth("jwt"));

var multer = require("multer");
var upload = multer({
  storage: multer.memoryStorage(),
  limit: {
    fileSize: 10000000,
  },
});

/**
 * @api {get} http://0.0.0.0/api/Company/getAllCompany
 * @apiName 取得所有廠商
 * @apiGroup A01
 *
 */
router.get("/getAllCompany", CompanyControllers.getAllCompany);

/**
 * @api {post} http://0.0.0.0/api/Company/addCompany
 * @apiName 新增廠商
 * @apiGroup A01
 *
 * @apiParam {String} com_homemadeName  自製廠商編號
 * @apiParam {String} com_name  廠商名稱 NOT NULL
 * @apiParam {String} com_address  廠商地址
 * @apiParam {String} com_phone  廠商電話
 * @apiParam {String} discount  結帳折扣 NOT NULL
 * @apiParam {String} payDay  結算日 NOT NULL
 *
 */
router.post("/addCompany", CompanyControllers.addCompany);

/**
 * @api {post} http://0.0.0.0/api/Company/editCompany
 * @apiName 修改廠商
 * @apiGroup A01
 *
 * @apiParam {String} com_id 廠商編號
 * @apiParam {String} com_homemadeName  自製廠商編號
 * @apiParam {String} com_name  廠商名稱 NOT NULL
 * @apiParam {String} com_address  廠商地址
 * @apiParam {String} com_phone  廠商電話
 * @apiParam {String} discount  結帳折扣 NOT NULL
 * @apiParam {String} payDay  結算日 NOT NULL
 *
 */
router.put("/editCompany", CompanyControllers.editCompany);

/**
 * @api {post} http://0.0.0.0/api/Company/deleteCompany
 * @apiName 假刪除廠商
 * @apiGroup A01
 *
 * @apiParam {List<com_id>} ListCom 廠商編號
 *
 */
router.put("/deleteCompany", CompanyControllers.deleteCompany);

/**
 * @api {post} http://0.0.0.0/api/Company/deleteCompany
 * @apiName 假刪除廠商
 * @apiGroup A01
 *
 * @apiParam {List<com_id>} ListCom 廠商編號 [com_id,com_id,com_id]
 *
 */
router.put("/deleteCompany", CompanyControllers.deleteCompany);

/**
 * @api {post} http://0.0.0.0/api/Company/csvAddCompany
 * @apiName
 * @apiGroup A01
 *
 * @apiParam {file} CompanyCSV 商品csv檔 NOT NULL
 */
router.post(
  "/csvAddCompany",
  upload.single("CompanyCSV"),
  CompanyControllers.csvAddCompany
);

module.exports = router;
