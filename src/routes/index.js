// index.js
var express = require("express");
var cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const AuthRoutes = require("./Auth");
router.use("/api/Auth", AuthRoutes);

const CompanyRoutes = require("./Company");
router.use("/api/Company", CompanyRoutes);

module.exports = router;
