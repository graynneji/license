const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: [true, "Please insert your domain"],
      unique: true,
    },
    supabaseUrl: {
      type: String,
      requires: [true, "Please insert your supabase url"],
      unique: true,
    },
    supabaseKey: {
      type: String,
      required: [true, "Please insert your supabase key"],
      unique: true,
    },
    licenseKey: {
      type: String,
      required: [true, "Please insert your license key"],
      unique: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    extended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("License", licenseSchema);
