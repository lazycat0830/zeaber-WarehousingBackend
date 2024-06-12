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

/**
 * @api {post} http://0.0.0.0/api/Product/csvAddProduct
 * @apiName
 * @apiGroup A01
 *
 * @apiParam {int} com_id 廠商編號 NOT NULL
 * @apiParam {file} ProductCSV 商品csv檔 NOT NULL
 */
router.post(
  "/csvAddProduct",
  upload.single("ProductCSV"),
  ProductControllers.csvAddProduct
);

/**
 * @api {post} http://0.0.0.0/api/Product/editProductImg
 * @apiName 修改商品
 * @apiGroup A01
 *
 * @apiParam {string} pro_id
 * @apiParam {file} pro_img
 */
router.put(
  "/editProductImg",
  upload.single("pro_img"),
  ProductControllers.editProductImg
);

/**
 * @api {post} http://0.0.0.0/api/Product/deleteProductImg
 * @apiName 清除商品圖片
 * @apiGroup A01
 *
 * @apiParam {List<pro_id>} ListPro 商品編號 [pro_id,pro_id,pro_id]
 */
router.put("/deleteProductImg", ProductControllers.deleteProductImg);

module.exports = router;
