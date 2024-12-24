const Shift = require("../../models/shift");

exports.fetchShift = (findQuery) => {
  return Shift.find(findQuery);
};
exports.insertShift = (dataQuery) => {
  return Shift.create(dataQuery);
};
exports.updateShift = (findQuery, updateQuery) => {
  return Shift.updateOne(findQuery, updateQuery);
};
