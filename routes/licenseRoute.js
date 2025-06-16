const express = require("express");
const router = express.Router();
const licenseController = require("../controllers/licenseController");
router.post("/register", licenseController.registerLicense);
router.post("/get", licenseController.getLicense);

module.exports = router;
