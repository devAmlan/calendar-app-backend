const User = require("../../models/user");
const Organization = require("../../models/organization");

exports.findUser = (findQuery) => {
  return User.findOne(findQuery);
};

exports.updateUser = (findQuery, updateQuery) => {
  return User.updateOne(findQuery, updateQuery);
};

// exports.findOrganization = (findQuery) => {
//   return Organization.findOne(findQuery);
// };
// exports.insertOrganization = (insertData) => {
//   return Organization.create(insertData);
// };

// exports.updateOrganization = (findQuery, updateQuery) => {
//   return Organization.updateOne(findQuery, updateQuery);
// };

// exports.fetchOrganization = (fetchQuery) => {
//   return Organization.findOne(fetchQuery);
// };

exports.removeUser = (deleteQuery) => {
  // need to remove that user from the organization
};
