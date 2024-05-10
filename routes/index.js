// index.js
var express = require("express");
var cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

const usersRoutes = require("./users");
router.use("/api/users", usersRoutes);

module.exports = router;
