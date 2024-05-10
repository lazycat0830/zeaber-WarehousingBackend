// index.js
var express = require("express");
var router = express.Router();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("Warehousing", "blackcat9052", "Sfhjlk9052", {
  host: "warehousing.database.windows.net",
  dialect: "mssql",
});

/* GET home page. localhost:3000/ */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET localhost:3000/test */
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
