var bcrypt = require("bcrypt");
var _ = require("lodash");

function random(len, _mapStr) {
  const mapStr =
    _mapStr || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const res = _.sampleSize(mapStr, len);
  return res.join("");
}

function hash(str) {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(str, saltRounds);
  return hash;
}

function verifyHash(org, hashedStr) {
  const saltRounds = 10;
  return bcrypt.compareSync(org, hashedStr);
}

module.exports = {
  random,
  hash,
  verifyHash,
};
