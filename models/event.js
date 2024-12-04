const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  employees: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = db.model("Event", eventSchema);
