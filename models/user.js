const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isNew: { type: Boolean, default: true },
  email: { type: String, required: true },
  profileImage: { type: String },
  lastLoginAt: { type: Date },
  organizationId: { type: mongoose.Schema.Types.ObjectId, default: null },
  role: { type: String, enum: ["employer", "employee"] },
});

module.exports = mongoose.model("User", userSchema);
