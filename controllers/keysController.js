const keysService = require("../services/keysServices");

/**
 * Generate 100 license keys and insert them into the database.
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<void>}
 */
exports.generateLicenseKeys = async (req, res) => {
  try {
    // Call the service to generate and insert 100 license keys
    await keysService.generateAndInsertKeys(100);
    res.json({ message: "100 License Keys Generated Successfully" });
  } catch (err) {
    console.error("Error generating license keys:", err);
    res.status(500).json({ error: "Error generating license keys" });
  }
};
