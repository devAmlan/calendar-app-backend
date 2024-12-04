const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employers: [{ type: mongoose.Schema.Types.ObjectId }],
  employees: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = db.model("Organization", organizationSchema);
