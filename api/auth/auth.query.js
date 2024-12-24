const User = require("../../models/user");

exports.insertUser = (insertData) => {
  return User.create(insertData);
};

exports.findUser = (findQuery) => {
  return User.findOne(findQuery);
};
