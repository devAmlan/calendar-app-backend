const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Shift", shiftSchema);
