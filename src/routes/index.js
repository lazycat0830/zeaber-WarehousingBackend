// index.js
var express = require("express");
var cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const companyRoutes = require("./Company");
router.use("/api/Company", companyRoutes);

module.exports = router;
