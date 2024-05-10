var _ = require("lodash");
var moment = require("moment");

class convertFormat {
  convertData = async (DataList) => {
    _.forEach(DataList, function (item) {
      if (item.purchaseDate) {
        item.purchaseDate = moment.utc(item.purchaseDate).format("YYYY-MM-DD");
      }
      if (item.returnDate) {
        item.returnDate = moment.utc(item.returnDate).format("YYYY-MM-DD");
      }
    });

    return DataList;
  };
  csvConvertArray = async (csvFile) => {
    const utf8String = Buffer.from(csvFile).toString("utf-8");
    const rows = utf8String.split("\n").filter((row) => row.trim().length > 0);
    const column = rows[0].split(",").map((col) => col.trim());
    const DataList = [];
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(",").map((value) => value.trim());
      const obj = _.zipObject(column, values);
      DataList.push(obj);
    }
    return DataList;
  };
}

module.exports = new convertFormat();
