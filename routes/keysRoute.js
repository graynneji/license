const express = require("express");
const router = express.Router();
const keysController = require("../controllers/keysController");

/**
 * @route   POST /api/licenses/generate
 * @desc    Generate 100 license keys and insert them into the database
 * @access  Public (change as needed)
 */
router.post("/generate", keysController.generateLicenseKeys);

module.exports = router;
