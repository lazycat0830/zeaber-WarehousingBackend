// index.js
var express = require("express");
var cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

const usersRoutes = require("./users");
router.use("/api/users", usersRoutes);

const companyRoutes = require("./Company");
router.use("/api/Company", companyRoutes);

module.exports = router;
