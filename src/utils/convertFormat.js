var _ = require("lodash");
var moment = require("moment");

class convertFormat {
  convertData = async (DataList) => {
    _.forEach(DataList, function (item) {
      if (item.pro_img) {
        item.pro_img =
          `data:application/png;base64,` +
          Buffer.from(item.pro_img).toString("base64");
      }
      if (item.pro_insertDate) {
        item.pro_insertDate = moment
          .utc(item.pro_insertDate)
          .format("YYYY-MM-DD HH:mm");
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
