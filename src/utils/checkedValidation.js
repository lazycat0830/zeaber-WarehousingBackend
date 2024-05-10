var _ = require("lodash");

class checkedValidationUtil {
  keyChecked = (bodyKey, obj) => {
    let checkedKeys = true;

    _.forEach(bodyKey, (key) => {
      if (Object.keys(obj).findIndex((item) => item === key) === -1) {
        checkedKeys = false;
        return;
      }
    });

    return checkedKeys;
  };
}

module.exports = new checkedValidationUtil();
