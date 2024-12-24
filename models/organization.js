const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inviteCode: { type: String, default: "" },
  employers: [{ type: mongoose.Schema.Types.ObjectId }],
  employees: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Organization", organizationSchema);
