const Keys = require("../models/keysModel");

/**
 * Generates a random license key in the format XXXX-XXXX-XXXX-XXXX.
 * @returns {string} The generated license key.
 */
generateKey = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () =>
    Array.from({ length: 4 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  return `${segment()}-${segment()}-${segment()}-${segment()}`;
};

/**
 * Generates and inserts multiple license keys into the database.
 * @param {number} count - Number of license keys to generate.
 * @returns {Promise<Array>} The inserted license key documents.
 */
exports.generateAndInsertKeys = async (count) => {
  // Generate an array of license key objects
  const keys = Array.from({ length: count }, () => ({
    key: generateKey(),
  }));
  // Insert the keys into the database
  return Keys.insertMany(keys);
};
