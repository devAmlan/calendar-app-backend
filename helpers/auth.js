const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.issueToken = function (user, expiresIn) {
  return jwt.sign({ ...user }, config.secretToken, {
    expiresIn: expiresIn ? expiresIn : config.tokenExpiryTime,
  });
};
