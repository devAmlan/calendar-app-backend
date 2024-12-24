const Organization = require("../../models/organization");

exports.findOrganization = (findQuery) => {
  return Organization.findOne(findQuery);
};
exports.insertOrganization = (insertData) => {
  return Organization.create(insertData);
};

exports.updateOrganization = (findQuery, updateQuery) => {
  return Organization.updateOne(findQuery, updateQuery);
};

exports.fetchOrganization = (fetchQuery) => {
  return Organization.findOne(fetchQuery);
};
