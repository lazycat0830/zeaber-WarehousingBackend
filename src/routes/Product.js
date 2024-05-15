var express = require("express");
var { jwtAuth } = require("../middlewares/jwtAuthMiddleware");
const ProductControllers = require("../http/controllers/ProductController");
const router = express.Router();

var multer = require("multer");
var upload = multer({
  storage: multer.memoryStorage(),
  limit: {
    fileSize: 10000000,
  },
});

/**
 * @api {post} http://0.0.0.0/api/Product/addProduct
 * @apiName 新增商品
 * @apiGroup A01
 *
 * @apiParam {number} com_id
 * @apiParam {string} pro_comName
 * @apiParam {string} pro_homemadeName
 * @apiParam {number} type_id
 * @apiParam {number} pro_cost
 * @apiParam {number} pro_price
 * @apiParam {file} pro_img
 * @apiParam {object} pro_style {"color":["紅","藍"],"size":[40,41,42,43,44]}
 *
 */
router.post(
  "/addProduct",
  upload.single("pro_img"),
  ProductControllers.addProduct
);

/**
 * @api {get} http://0.0.0.0/api/Product/getAllProduct
 * @apiName 取得所有商品
 * @apiGroup A01
 *
 */
router.get("/getAllProduct", ProductControllers.getAllProduct);

/**
 * @api {get} http://0.0.0.0/api/Product/deleteProduct
 * @apiName 刪除指定商品
 * @apiGroup A01
 *
 */
router.put("/deleteProduct", ProductControllers.deleteProduct);

/**
 * @api {post} http://0.0.0.0/api/Product/editProduct
 * @apiName 修改商品
 * @apiGroup A01
 *
 * @apiParam {string} pro_id
 * @apiParam {number} com_id
 * @apiParam {string} pro_comName
 * @apiParam {string} pro_homemadeName
 * @apiParam {number} type_id
 * @apiParam {number} pro_cost
 * @apiParam {number} pro_price
 * @apiParam {file} pro_img
 * @apiParam {object} pro_style {"color":["紅","藍"],"size":[40,41,42,43,44]}
 *
 */
router.put(
  "/editProduct",
  upload.single("pro_img"),
  ProductControllers.editProduct
);

module.exports = router;
