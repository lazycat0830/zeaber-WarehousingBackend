var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const ProductTypeControllers = require("../http/controllers/ProductTypeController");
const router = express.Router();

var multer = require("multer");
var upload = multer({
  storage: multer.memoryStorage(),
  limit: {
    fileSize: 10000000,
  },
});

/**
 * @api {get} http://0.0.0.0/api/ProductType/getAllProductType
 * @apiName 取得所有商品類型
 * @apiGroup A01
 *
 */
router.get("/getAllProductType", ProductTypeControllers.getAllProductType);

/**
 * @api {post} http://0.0.0.0/api/ProductType/addProductType
 * @apiName 新增商品類型
 * @apiGroup A01
 *
 * @apiParam {String} type_title  類型名稱 NOT NULL
 *
 */
router.post("/addProductType", ProductTypeControllers.addProductType);

/**
 * @api {put} http://0.0.0.0/api/ProductType/editProductType
 * @apiName 修改商品類型
 * @apiGroup A01
 *
 * @apiParam {String} type_id  類型編號 NOT NULL
 * @apiParam {String} type_title  類型名稱 NOT NULL
 *
 */
router.put("/editProductType", ProductTypeControllers.editProductType);

/**
 * @api {delete} http://0.0.0.0/api/ProductType/delProductType
 * @apiName 刪除商品類型
 * @apiGroup A01
 *
 * @apiParam {Array} ListTypeId  類型編號 NOT NULL [type_id,type_id,type_id]
 *
 */
router.delete("/delProductType", ProductTypeControllers.delProductType);

module.exports = router;
