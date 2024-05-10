// index.js
var express = require("express");

var jwt = require("../middlewares/jwtAuthMiddleware");
const { jwtAuth } = jwt;

const sequelize = require("../config/db");

var router = express.Router();
// router.use(jwtAuth("jwt"));

/* GET home page. localhost:3000/api/users/ */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET localhost:3000/api/users/test */
router.get("/test", async function (req, res, next) {
  const sql = `SELECT * FROM Company`;
  try {
    const account = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).send(account);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
