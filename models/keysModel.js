const mongoose = require("mongoose");

const keysSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Keys", keysSchema);
